import { Lazy, Token, Tokenization } from '../lib';
import { createTokenDouble, extractTokenDouble } from '../lib/private/encoding';
import { Intrinsic } from '../lib/private/intrinsic';
import { findTokens } from '../lib/private/resolve';
import { DefaultTokenResolver, IResolvable } from '../lib/resolvable';
import { evaluateCFN } from './evaluate-cfn';
import { App } from './util';

test('resolve a plain old object should just return the object', () => {
  const obj = { PlainOldObject: 123, Array: [1, 2, 3] };
  expect(resolve(obj)).toEqual(obj);
});

test('if a value is an object with a token value, it will be evaluated', () => {
  const obj = {
    RegularValue: 'hello',
    LazyValue: new Intrinsic('World')
  };

  expect(resolve(obj)).toEqual({
    RegularValue: 'hello',
    LazyValue: 'World'
  });

});

test('tokens are evaluated anywhere in the object tree', () => {
  const obj = new Promise1();
  const actual = resolve({ Obj: obj });

  expect(actual).toEqual({
    Obj: [
      {
        Data: {
          stringProp: "hello",
          numberProp: 1234
        },
        Recurse: 42
      },
      {
        Data: {
          stringProp: "hello",
          numberProp: 1234
        },
        Recurse: 42
      }
    ]
  });

});

test('tokens are evaluated recursively', () => {
  const obj = new Promise1();
  const actual = resolve(new Intrinsic({ Obj: obj }));

  expect(actual).toEqual({
    Obj: [
      {
        Data: {
          stringProp: "hello",
          numberProp: 1234
        },
        Recurse: 42
      },
      {
        Data: {
          stringProp: "hello",
          numberProp: 1234
        },
        Recurse: 42
      }
    ]
  });

});

test('empty arrays or objects are kept', () => {
  expect(resolve({})).toEqual({});
  expect(resolve([])).toEqual([]);

  const obj = {
    Prop1: 1234,
    Prop2: {},
    Prop3: [],
    Prop4: 'hello',
    Prop5: {
      PropA: {},
      PropB: {
        PropC: [undefined, undefined],
        PropD: 'Yoohoo'
      }
    }
  };

  expect(resolve(obj)).toEqual({
    Prop1: 1234,
    Prop2: {},
    Prop3: [],
    Prop4: 'hello',
    Prop5: {
      PropA: {},
      PropB: {
        PropC: [],
        PropD: 'Yoohoo'
      }
    }
  });

});

test('if an object has a "resolve" property that is not a function, it is not considered a token', () => {
  expect(resolve({ a_token: { resolve: () => 78787 } })).toEqual({ a_token: 78787 });
  expect(resolve({ not_a_token: { resolve: 12 } })).toEqual({ not_a_token: { resolve: 12 } });
});

  // tslint:disable-next-line:max-line-length
test('if a resolvable object inherits from a class that is also resolvable, the "constructor" function will not get in the way (uses Object.keys instead of "for in")', () => {
  expect(resolve({ prop: new DataType() })).toEqual({ prop: { foo: 12, goo: 'hello' } });
});

test('isToken(obj) can be used to determine if an object is a token', () => {
  expect(Tokenization.isResolvable({ resolve: () => 123 })).toBeTruthy();
  expect(Tokenization.isResolvable({ a: 1, b: 2, resolve: () => 'hello' })).toBeTruthy();
  expect(Tokenization.isResolvable({ a: 1, b: 2, resolve: 3 })).toBeFalsy();
});

test('Token can be used to create tokens that contain a constant value', () => {
  expect(resolve(new Intrinsic(12))).toBe(12);
  expect(resolve(new Intrinsic('hello'))).toBe('hello');
  expect(resolve(new Intrinsic(['hi', 'there']))).toEqual(['hi', 'there']);
});

test('resolving leaves a Date object in working order', () => {
  const date = new Date('2000-01-01');
  const resolved = resolve(date);

  expect(date.toString()).toBe(resolved.toString());
});

test('tokens can be stringified and evaluated to conceptual value', () => {
  // GIVEN
  const token = new Intrinsic('woof woof');

  // WHEN
  const stringified = `The dog says: ${token}`;
  const resolved = resolve(stringified);

  // THEN
  expect(evaluateCFN(resolved)).toBe('The dog says: woof woof');
});

test('tokens stringification can be reversed', () => {
  // GIVEN
  const token = new Intrinsic('woof woof');

  // THEN
  expect(Tokenization.reverseString(`${token}`).firstToken).toBe(token);
});

test('Doubly nested strings evaluate correctly in scalar context', () => {
  // GIVEN
  const token1 = new Intrinsic("world");
  const token2 = new Intrinsic(`hello ${token1}`);

  // WHEN
  const resolved1 = resolve(token2.toString());
  const resolved2 = resolve(token2);

  // THEN
  expect(evaluateCFN(resolved1)).toBe("hello world");
  expect(evaluateCFN(resolved2)).toBe("hello world");

});

test('integer Tokens can be stringified and evaluate to conceptual value', () => {
  // GIVEN
  for (const token of tokensThatResolveTo(1)) {
    // WHEN
    const stringified = `the number is ${token}`;
    const resolved = resolve(stringified);

    // THEN
    expect(evaluateCFN(resolved)).toBe('the number is 1');
  }
});

test('tokens resolve properly in initial position', () => {
  // GIVEN
  for (const token of tokensThatResolveTo('Hello')) {
    // WHEN
    const resolved = resolve(`${token} world`);

    // THEN
    expect(evaluateCFN(resolved)).toBe('Hello world');
  }

});

test('side-by-side Tokens resolve correctly', () => {
  // GIVEN
  for (const token1 of tokensThatResolveTo('Hello ')) {
    for (const token2 of tokensThatResolveTo('world')) {
      // WHEN
      const resolved = resolve(`${token1}${token2}`);

      // THEN
      expect(evaluateCFN(resolved)).toBe('Hello world');
    }
  }

});

test('tokens can be used in hash keys but must resolve to a string', () => {
  // GIVEN
  const token = new Intrinsic('I am a string');

  // WHEN
  const s = {
    [token.toString()]: `boom ${token}`
  };

  // THEN
  expect(resolve(s)).toEqual({ 'I am a string': 'boom I am a string' });
});

test('tokens can be nested in hash keys', () => {
  // GIVEN
  const token = new Intrinsic(Lazy.stringValue({ produce: () => Lazy.stringValue({ produce: (() => 'I am a string') }) }));

  // WHEN
  const s = {
    [token.toString()]: `boom ${token}`
  };

  // THEN
  expect(resolve(s)).toEqual({ 'I am a string': 'boom I am a string' });
});

test('tokens can be nested and concatenated in hash keys', () => {
  // GIVEN
  const innerToken = new Intrinsic('toot');
  const token = new Intrinsic(`${innerToken} the woot`);

  // WHEN
  const s = {
    [token.toString()]: `boom chicago`
  };

  // THEN
  expect(resolve(s)).toEqual({ 'toot the woot': 'boom chicago' });
});

test('can find nested tokens in hash keys', () => {
  // GIVEN
  const innerToken = new Intrinsic('toot');
  const token = new Intrinsic(`${innerToken} the woot`);

  // WHEN
  const s = {
    [token.toString()]: `boom chicago`
  };

  // THEN
  const tokens = findTokens(new App(), () => s);
  expect(tokens).toContain(innerToken);
  expect(tokens).toContain(token);
});

test('fails if token in a hash key resolves to a non-string', () => {
  // GIVEN
  const token = new Intrinsic({ Ref: 'Other' });

  // WHEN
  const s = {
    [token.toString()]: `boom ${token}`
  };

  // THEN
  expect(() => resolve(s))
    .toThrow(/"\$\{Token\[TOKEN\.\d+\]\}" is used as the key in a map so must resolve to a string, but it resolves to: \{"Ref":"Other"\}/);
});

describe('list encoding', () => {
  test('can encode Token to string and resolve the encoding', () => {
    // GIVEN
    const token = new Intrinsic({ Ref: 'Other' });

    // WHEN
    const struct = {
      XYZ: Token.asList(token)
    };

    // THEN
    expect(resolve(struct)).toEqual({
      XYZ: { Ref: 'Other' }
    });

  });

  test('cannot add to encoded list', () => {
    // GIVEN
    const token = new Intrinsic({ Ref: 'Other' });

    // WHEN
    const encoded: string[] = Token.asList(token);
    encoded.push('hello');

    // THEN
    expect(() => resolve(encoded)).toThrow(/Cannot add elements to list token/);

  });

  test('cannot add to strings in encoded list', () => {
    // GIVEN
    const token = new Intrinsic({ Ref: 'Other' });

    // WHEN
    const encoded: string[] = Token.asList(token);
    encoded[0] += 'hello';

    // THEN
    expect(() => resolve(encoded)).toThrow(/concatenate strings in/);

  });
});

describe('number encoding', () => {
  test('basic integer encoding works', () => {
    expect(extractTokenDouble(createTokenDouble(16))).toBe(16);
  });

  test('arbitrary integers can be encoded, stringified, and recovered', () => {
    for (let i = 0; i < 100; i++) {
      // We can encode all numbers up to 2^48-1
      const x = Math.floor(Math.random() * (Math.pow(2, 48) - 1));

      const encoded = createTokenDouble(x);
      // Roundtrip through JSONification
      const roundtripped = JSON.parse(JSON.stringify({ theNumber: encoded })).theNumber;
      const decoded = extractTokenDouble(roundtripped);
      expect(decoded).toBe(x);
    }

  });

  test('arbitrary numbers are correctly detected as not being tokens', () => {
    expect(extractTokenDouble(0)).toBeUndefined();
    expect(extractTokenDouble(1243)).toBeUndefined();
    expect(extractTokenDouble(4835e+532)).toBeUndefined();
  });

  test('can number-encode and resolve Token objects', () => {
    // GIVEN
    const x = new Intrinsic(123);

    // THEN
    const encoded = Token.asNumber(x);
    expect(Tokenization.isResolvable(encoded)).toBeFalsy();
    expect(Token.isUnresolved(encoded)).toBeTruthy();

    // THEN
    const resolved = resolve({ value: encoded });
    expect(resolved).toEqual({ value: 123 });
  });
});

test('stack trace is captured at token creation', () => {
  function fn1() {
    function fn2() {
      class ExposeTrace extends Intrinsic {
        public get creationTrace() {
          return this.creationStack;
        }
      }

      return new ExposeTrace('hello');
    }

    return fn2();
  }

  const token = fn1();
  expect(token.creationTrace.find(x => x.includes('fn1'))).toBeDefined();
  expect(token.creationTrace.find(x => x.includes('fn2'))).toBeDefined();
});

test('newError returns an error with the creation stack trace', () => {
  function fn1() {
    function fn2() {
      function fn3() {
        class ThrowingToken extends Intrinsic {
          public throwError(message: string) {
            throw this.newError(message);
          }
        }
        return new ThrowingToken('boom');
      }

      return fn3();
    }
    return fn2();
  }
  const token = fn1();
  expect(() => token.throwError('message!')).toThrow(/Token created:/);
});

describe('type coercion', () => {
  const inputs = [
    'a string',
    1234,
    { an_object: 1234 },
    [1, 2, 3],
    false
  ];

  for (const input of inputs) {
    // GIVEN
    const stringToken = Token.asString(new Intrinsic(input));
    const numberToken = Token.asNumber(new Intrinsic(input));
    const listToken = Token.asList(new Intrinsic(input));

    // THEN
    const expected = input;

    test(`${input}<string>.toNumber()`, () => {
      expect(resolve(Token.asNumber(new Intrinsic(stringToken)))).toEqual(expected);
    });

    test(`${input}<list>.toNumber()`, () => {
      expect(resolve(Token.asNumber(new Intrinsic(listToken)))).toEqual(expected);
    });

    test(`${input}<number>.toNumber()`, () => {
      expect(resolve(Token.asNumber(new Intrinsic(numberToken)))).toEqual(expected);
    });

    test(`${input}<string>.toString()`, () => {
      expect(resolve(new Intrinsic(stringToken).toString())).toEqual(expected);
    });

    test(`${input}<list>.toString()`, () => {
      expect(resolve(new Intrinsic(listToken).toString())).toEqual(expected);
    });

    test(`${input}<number>.toString()`, () => {
      expect(resolve(new Intrinsic(numberToken).toString())).toEqual(expected);
    });

    test(`${input}<string>.toList()`, () => {
      expect(resolve(Token.asList(new Intrinsic(stringToken)))).toEqual(expected);
    });

    test(`${input}<list>.toList()`, () => {
      expect(resolve(Token.asList(new Intrinsic(listToken)))).toEqual(expected);
    });

    test(`${input}<number>.toList()`, () => {
      expect(resolve(Token.asList(new Intrinsic(numberToken)))).toEqual(expected);
    });
  }
});

  test('creation stack is attached to errors emitted during resolve', () => {
    function showMeInTheStackTrace() {
      return Lazy.stringValue({ produce: () => { throw new Error('fooError'); } });
    }

    const x = showMeInTheStackTrace();
    let message;
    try {
      resolve(x);
    } catch (e) {
      message = e.message;
    }

    expect(message?.includes('showMeInTheStackTrace')).toBeTruthy();
  });

describe('stringifyNumber', () => {
  test('converts number to string', () => {
    expect(Tokenization.stringifyNumber(100)).toBe('100');
  });

  test('converts tokenized number to string', () => {
    expect(resolve(Tokenization.stringifyNumber({
      resolve: () => 100
    } as any))).toBe('100');
  });

  test('string remains the same', () => {
    expect(Tokenization.stringifyNumber('123' as any)).toBe('123');
  });

  test('Ref remains the same', () => {
    const val = { Ref: 'SomeLogicalId' };
    expect(Tokenization.stringifyNumber(val as any)).toBe(val);
  });

  test('lazy Ref remains the same', () => {
    const resolvedVal = { Ref: 'SomeLogicalId' };
    const tokenizedVal = Lazy.anyValue({
      produce: () => resolvedVal
    });
    const res = Tokenization.stringifyNumber(tokenizedVal as any) as any;
    expect(res).not.toEqual(resolvedVal);
    expect(resolve(res)).toEqual(resolvedVal);
  });

  test('tokenized Ref remains the same', () => {
    const resolvedVal = { Ref: 'SomeLogicalId' };
    const tokenizedVal = Token.asNumber(resolvedVal);
    const res = Tokenization.stringifyNumber(tokenizedVal) as any;
    expect(res).not.toEqual(resolvedVal);
    expect(resolve(res)).toEqual(resolvedVal);
  });
});

class Promise2 implements IResolvable {
  public readonly creationStack = [];

  public resolve() {
    return {
      Data: {
        stringProp: 'hello',
        numberProp: 1234,
      },
      Recurse: new Intrinsic( 42)
    };
  }
}

class Promise1 implements IResolvable {
  public readonly creationStack = [];
  public p2 = [ new Promise2(), new Promise2() ];

  public resolve() {
    return this.p2;
  }
}

class BaseDataType {
  constructor(readonly foo: number) {
  }
}

class DataType extends BaseDataType {
  public goo = 'hello';

  constructor() {
    super(12);
  }
}

/**
 * Return Tokens in both flavors that resolve to the given string
 */
function tokensThatResolveTo(value: any): Token[] {
  return [
    new Intrinsic(value),
    Lazy.anyValue({ produce: () => value })
  ];
}

/**
 * Wrapper for resolve that creates an throwaway Construct to call it on
 *
 * So I don't have to change all call sites in this file.
 */
function resolve(x: any) {
  const scope = new App();
  return Tokenization.resolve(x, {
    scope,
    resolver: new DefaultTokenResolver({
      join: (left, right) => left + right
    }),
    preparing: false
  });
}
