import { Construct, ConstructMetadata, IConstruct, Node, ConstructOrder, ValidationError } from '../src';
import { IAspect } from '../src/aspect';
import { App as Root } from './util';

// tslint:disable:variable-name
// tslint:disable:max-line-length

test('the "Root" construct is a special construct which can be used as the root of the tree', () => {
  const root = new Root();
  const node = Node.of(root);
  expect(node.id).toBe('');
  expect(node.scope).toBeUndefined();
  expect(node.children.length).toBe(0);
});

test('constructs cannot be created with an empty name unless they are root', () => {
  const root = new Root();
  expect(() => new Construct(root, '')).toThrow(/Only root constructs may have an empty name/);
});

test('construct.name returns the name of the construct', () => {
  const t = createTree();

  expect(Node.of(t.child1).id).toBe('Child1');
  expect(Node.of(t.child2).id).toBe('Child2');
  expect(Node.of(t.child1_1).id).toBe('Child11');
  expect(Node.of(t.child1_2).id).toBe('Child12');
  expect(Node.of(t.child1_1_1).id).toBe('Child111');
  expect(Node.of(t.child2_1).id).toBe('Child21');

});

test('construct id can use any character except the path separator', () => {
  const root = new Root();
  expect(() => new Construct(root, 'valid')).not.toThrow();
  expect(() => new Construct(root, 'ValiD')).not.toThrow();
  expect(() => new Construct(root, 'Va123lid')).not.toThrow();
  expect(() => new Construct(root, 'v')).not.toThrow();
  expect(() => new Construct(root, '  invalid' )).not.toThrow();
  expect(() => new Construct(root, 'invalid   ' )).not.toThrow();
  expect(() => new Construct(root, '123invalid' )).not.toThrow();
  expect(() => new Construct(root, 'in valid' )).not.toThrow();
  expect(() => new Construct(root, 'in_Valid' )).not.toThrow();
  expect(() => new Construct(root, 'in-Valid' )).not.toThrow();
  expect(() => new Construct(root, 'in\\Valid' )).not.toThrow();
  expect(() => new Construct(root, 'in.Valid' )).not.toThrow();
});

test('if construct id contains path seperators, they will be replaced by double-dash', () => {
  const root = new Root();
  const c = new Construct(root, 'Boom/Boom/Bam');
  expect(Node.of(c).id).toBe('Boom--Boom--Bam');
});

test('if "undefined" is forcefully used as an "id", it will be treated as an empty string', () => {
  const c = new Construct(undefined as any, undefined as any);
  expect(Node.of(c).id).toBe('');
});

test('construct.uniqueId returns a tree-unique alphanumeric id of this construct', () => {
  const root = new Root();

  const child1 = new Construct(root, 'This is the first child');
  const child2 = new Construct(child1, 'Second level');
  const c1 = new Construct(child2, 'My construct');
  const c2 = new Construct(child1, 'My construct');

  expect(Node.of(c1).path).toBe('This is the first child/Second level/My construct');
  expect(Node.of(c2).path).toBe('This is the first child/My construct');
  expect(Node.of(c1).uniqueId).toBe('ThisisthefirstchildSecondlevelMyconstruct202131E0');
  expect(Node.of(c2).uniqueId).toBe('ThisisthefirstchildMyconstruct8C288DF9');
});

test('cannot calculate uniqueId if the construct path is ["Default"]', () => {
  const root = new Root();
  const c = new Construct(root, 'Default');
  expect(() => Node.of(c).uniqueId).toThrow(/Unable to calculate a unique id for an empty set of components/);
});

test('construct.getChildren() returns an array of all children', () => {
  const root = new Root();
  const child = new Construct(root, 'Child1');
  new Construct(root, 'Child2');
  expect(Node.of(child).children.length).toBe(0);
  expect(Node.of(root).children.length).toBe(2);
});

test('construct.findChild(name) can be used to retrieve a child from a parent', () => {
  const root = new Root();
  const child = new Construct(root, 'Contruct');
  expect(Node.of(root).tryFindChild(Node.of(child).id)).toBe(child);
  expect(Node.of(root).tryFindChild('NotFound')).toBeUndefined();
});

test('construct.getChild(name) can be used to retrieve a child from a parent', () => {
  const root = new Root();
  const child = new Construct(root, 'Contruct');
  expect(Node.of(root).findChild(Node.of(child).id)).toBe(child);
  expect(() => Node.of(root).findChild('NotFound')).toThrow(/No child with id: 'NotFound'/);
});

test('construct.getContext(key) can be used to read a value from context defined at the root level', () => {
  const context = {
    ctx1: 12,
    ctx2: 'hello',
  };

  const t = createTree(context);
  expect(Node.of(t.child1_2).tryGetContext('ctx1')).toBe(12);
  expect(Node.of(t.child1_1_1).tryGetContext('ctx2')).toBe('hello');
});

// tslint:disable-next-line:max-line-length
test('construct.setContext(k,v) sets context at some level and construct.getContext(key) will return the lowermost value defined in the stack', () => {
  const root = new Root();
  const highChild = new Construct(root, 'highChild');
  Node.of(highChild).setContext('c1', 'root');
  Node.of(highChild).setContext('c2', 'root');

  const child1 = new Construct(highChild, 'child1');
  Node.of(child1).setContext('c2', 'child1');
  Node.of(child1).setContext('c3', 'child1');

  const child2 = new Construct(highChild, 'child2');
  const child3 = new Construct(child1, 'child1child1');
  Node.of(child3).setContext('c1', 'child3');
  Node.of(child3).setContext('c4', 'child3');

  expect(Node.of(highChild).tryGetContext('c1')).toBe('root');
  expect(Node.of(highChild).tryGetContext('c2')).toBe('root');
  expect(Node.of(highChild).tryGetContext('c3')).toBeUndefined();

  expect(Node.of(child1).tryGetContext('c1')).toBe('root');
  expect(Node.of(child1).tryGetContext('c2')).toBe('child1');
  expect(Node.of(child1).tryGetContext('c3')).toBe('child1');

  expect(Node.of(child2).tryGetContext('c1')).toBe('root');
  expect(Node.of(child2).tryGetContext('c2')).toBe('root');
  expect(Node.of(child2).tryGetContext('c3')).toBeUndefined();

  expect(Node.of(child3).tryGetContext('c1')).toBe('child3');
  expect(Node.of(child3).tryGetContext('c2')).toBe('child1');
  expect(Node.of(child3).tryGetContext('c3')).toBe('child1');
  expect(Node.of(child3).tryGetContext('c4')).toBe('child3');

});

test('construct.setContext(key, value) can only be called before adding any children', () => {
  const root = new Root();
  new Construct(root, 'child1');
  expect(() => Node.of(root).setContext('k', 'v')).toThrow(/Cannot set context after children have been added: child1/);
});

test('construct.pathParts returns an array of strings of all names from root to node', () => {
  const tree = createTree();
  expect(Node.of(tree.root).path).toBe('');
  expect(Node.of(tree.child1_1_1).path).toBe('HighChild/Child1/Child11/Child111');
  expect(Node.of(tree.child2).path).toBe('HighChild/Child2');
});

test('if a root construct has a name, it should be included in the path', () => {
  const tree = createTree({});
  expect(Node.of(tree.root).path).toBe('');
  expect(Node.of(tree.child1_1_1).path).toBe('HighChild/Child1/Child11/Child111');
});

test('construct can not be created with the name of a sibling', () => {
  const root = new Root();

  // WHEN
  new Construct(root, 'SameName');

  // THEN: They have different paths
  expect(() => new Construct(root, 'SameName')).toThrow(/There is already a Construct with name 'SameName' in App/);

  // WHEN
  const c0 = new Construct(root, 'c0');
  new Construct(c0, 'SameName');

  // THEN: They have different paths
  expect(() => new Construct(c0, 'SameName')).toThrow(/There is already a Construct with name 'SameName' in Construct \[c0\]/);
});

test('addMetadata(type, data) can be used to attach metadata to constructs', () => {
  const root = new Root();
  const con = new Construct(root, 'MyConstruct');
  expect(Node.of(con).metadata).toEqual([]);

  const node = Node.of(con);
  (function FIND_ME() { // <-- Creates a stack trace marker we'll be able to look for
    node.addMetadata('key', 'value');
    node.addMetadata('number', 103);
    node.addMetadata('array', [123, 456]);
  })();

  expect(node.metadata[0].type).toBe('key');
  expect(node.metadata[0].data).toBe('value');
  expect(node.metadata[1].data).toBe(103);
  expect(node.metadata[2].data).toEqual([123, 456]);

  expect(node.metadata[0].trace?.[0]).toContain('FIND_ME');
});

test('addMetadata(type, undefined/null) is ignored', () => {
  const root = new Root();
  const con = new Construct(root, 'Foo');
  const node = Node.of(con);
  node.addMetadata('Null', null);
  node.addMetadata('Undefined', undefined);
  node.addMetadata('True', true);
  node.addMetadata('False', false);
  node.addMetadata('Empty', '');

  const exists = (key: string) => node.metadata.find(x => x.type === key);

  expect(exists('Null')).toBeFalsy();
  expect(exists('Undefined')).toBeFalsy();
  expect(exists('True')).toBeTruthy();
  expect(exists('False')).toBeTruthy();
  expect(exists('Empty')).toBeTruthy();
});

test('addWarning(message) can be used to add a "WARNING" message entry to the construct', () => {
  const root = new Root();
  const con = new Construct(root, 'MyConstruct');
  const node = Node.of(con);
  node.addWarning('This construct is deprecated, use the other one instead');
  expect(node.metadata[0].type).toBe(ConstructMetadata.WARNING_METADATA_KEY);
  expect(node.metadata[0].data).toBe('This construct is deprecated, use the other one instead');
  expect(node.metadata[0].trace?.length).toBeGreaterThan(0);
});

test('addError(message) can be used to add a "ERROR" message entry to the construct', () => {
  const root = new Root();
  const con = new Construct(root, 'MyConstruct');
  const node = Node.of(con);
  node.addError('Stop!');
  expect(node.metadata[0].type).toBe(ConstructMetadata.ERROR_METADATA_KEY);
  expect(node.metadata[0].data).toBe('Stop!');
  expect(node.metadata[0].trace?.length).toBeGreaterThan(0);
});

test('addInfo(message) can be used to add an "INFO" message entry to the construct', () => {
  const root = new Root();
  const con = new Construct(root, 'MyConstruct');
  const node = Node.of(con);
  node.addInfo('Hey there, how do you do?');
  expect(node.metadata[0].type).toBe(ConstructMetadata.INFO_METADATA_KEY);
  expect(node.metadata[0].data).toBe('Hey there, how do you do?');
  expect(node.metadata[0].trace?.length).toBeGreaterThan(0);
});

test('multiple children of the same type, with explicit names are welcome', () => {
  const root = new Root();
  new MyBeautifulConstruct(root, 'mbc1');
  new MyBeautifulConstruct(root, 'mbc2');
  new MyBeautifulConstruct(root, 'mbc3');
  new MyBeautifulConstruct(root, 'mbc4');
  expect(Node.of(root).children.length).toBeGreaterThanOrEqual(4);
});

// tslint:disable-next-line:max-line-length
test('construct.onValidate() can be implemented to perform validation, node.validate() will return all errors from the subtree (DFS)', () => {

  class MyConstruct extends Construct {
    protected onValidate() {
      return ['my-error1', 'my-error2'];
    }
  }

  class YourConstruct extends Construct {
    protected onValidate() {
      return ['your-error1'];
    }
  }

  class TheirConstruct extends Construct {
    constructor(scope: Construct, id: string) {
      super(scope, id);

      new YourConstruct(this, 'YourConstruct');
    }

    protected onValidate() {
      return ['their-error'];
    }
  }

  class TestStack extends Root {
    constructor() {
      super();

      new MyConstruct(this, 'MyConstruct');
      new TheirConstruct(this, 'TheirConstruct');
    }

    protected onValidate() {
      return ['stack-error'];
    }
  }

  const stack = new TestStack();

  const errors = Node.of(stack).validate()
    .map((v: ValidationError) => ({ path: Node.of(v.source).path, message: v.message }));

  // validate DFS
  expect(errors).toEqual([
    { path: 'MyConstruct', message: 'my-error1' },
    { path: 'MyConstruct', message: 'my-error2' },
    { path: 'TheirConstruct/YourConstruct', message: 'your-error1' },
    { path: 'TheirConstruct', message: 'their-error' },
    { path: '', message: 'stack-error' },
  ]);

});

test('node.addValidation() can be implemented to perform validation, node.validate() will return errors', () => {

  class MyConstruct extends Construct {
    constructor(scope: Construct, id: string) {
      super(scope, id);

      Node.of(this).addValidation({ validate: () => ['my-error1', 'my-error2'] });
    }
  }

  class YourConstruct extends Construct {
    constructor(scope: Construct, id: string) {
      super(scope, id);

      Node.of(this).addValidation({ validate: () => ['your-error1'] });
    }
  }

  class TheirConstruct extends Construct {
    constructor(scope: Construct, id: string) {
      super(scope, id);

      new YourConstruct(this, 'YourConstruct');

      Node.of(this).addValidation({ validate: () => ['their-error'] });
    }
  }

  class TestStack extends Root {
    constructor() {
      super();

      new MyConstruct(this, 'MyConstruct');
      new TheirConstruct(this, 'TheirConstruct');

      Node.of(this).addValidation({ validate: () => ['stack-error'] });
    }
  }

  const stack = new TestStack();
  const errors = Node.of(stack).validate();

  // validate DFS
  expect(errors.map(x => ({ path: Node.of(x.source).path, message: x.message }))).toEqual([
    { path: 'MyConstruct', message: 'my-error1' },
    { path: 'MyConstruct', message: 'my-error2' },
    { path: 'TheirConstruct/YourConstruct', message: 'your-error1' },
    { path: 'TheirConstruct', message: 'their-error' },
    { path: '', message: 'stack-error' },
  ]);

});

test('node.validate() returns an empty array if the construct does not implement IValidation', () => {
  // GIVEN
  const root = new Root();

  // THEN
  expect(Node.of(root).validate()).toStrictEqual([]);
});

test('node.addValidation() can be used to add a validation function to a construct', () => {
  // GIVEN
  const construct = new Root();
  Node.of(construct).addValidation({ validate: () => ['error1', 'error2'] });
  Node.of(construct).addValidation({ validate: () => ['error3'] });

  expect(Node.of(construct).validate().map(x => x.message)).toStrictEqual(['error1', 'error2', 'error3']);
});

test('both "onValidate()" and "addValidation()" works', () => {
  // GIVEN
  const root = new Root();

  // WHEN
  class MyConstruct extends Construct {
    onValidate() {
      return ['from onValidate()'];
    }
  }
  const c = new MyConstruct(root, 'MyConstruct');
  Node.of(c).addValidation({ validate: () => ['from addValidation()'] });

  // THEN
  expect(Node.of(root).validate().map(x => x.message)).toEqual([
    'from onValidate()',
    'from addValidation()',
  ]);
});

test('construct.lock() protects against adding children anywhere under this construct (direct or indirect)', () => {

  class LockableConstruct extends Construct {
    public lockMe() {
      (Node.of(this) as any)._lock();
    }

    public unlockMe() {
      (Node.of(this) as any)._unlock();
    }
  }

  const stack = new Root();

  const c0a = new LockableConstruct(stack, 'c0a');
  const c0b = new Construct(stack, 'c0b');

  const c1a = new Construct(c0a, 'c1a');
  const c1b = new Construct(c0a, 'c1b');

  c0a.lockMe();

  // now we should still be able to add children to c0b, but not to c0a or any its children
  new Construct(c0b, 'c1a');
  expect(() => new Construct(c0a, 'fail1')).toThrow(/Cannot add children to "c0a" during synthesis/);
  expect(() => new Construct(c1a, 'fail2')).toThrow(/Cannot add children to "c0a\/c1a" during synthesis/);
  expect(() => new Construct(c1b, 'fail3')).toThrow(/Cannot add children to "c0a\/c1b" during synthesis/);

  c0a.unlockMe();

  new Construct(c0a, 'c0aZ');
  new Construct(c1a, 'c1aZ');
  new Construct(c1b, 'c1bZ');

});

test('findAll returns a list of all children in either DFS or BFS', () => {
  // GIVEN
  const c1 = new Construct(undefined as any, '1');
  const c2 = new Construct(c1, '2');
  new Construct(c1, '3');
  new Construct(c2, '4');
  new Construct(c2, '5');

  // THEN
  const node = Node.of(c1);
  expect(node.findAll().map(x => Node.of(x).id)).toEqual(Node.of(c1).findAll(ConstructOrder.PREORDER).map(x => Node.of(x).id)); // default is PreOrder
  expect(node.findAll(ConstructOrder.PREORDER).map(x => Node.of(x).id)).toEqual(['1', '2', '4', '5', '3']);
  expect(node.findAll(ConstructOrder.POSTORDER).map(x => Node.of(x).id)).toEqual(['4', '5', '2', '3', '1']);
});

test('ancestors returns a list of parents up to root', () => {
  const { child1_1_1 } = createTree();
  expect(Node.of(child1_1_1).scopes.map(x => Node.of(x).id)).toEqual(['', 'HighChild', 'Child1', 'Child11', 'Child111']);
});

test('"root" returns the root construct', () => {
  const { child1, child2, child1_1_1, root } = createTree();
  expect(Node.of(child1).root).toBe(root);
  expect(Node.of(child2).root).toBe(root);
  expect(Node.of(child1_1_1).root).toBe(root);
});

describe('defaultChild', () => {
  test('returns the child with id "Resource"', () => {
    const root = new Root();
    new Construct(root, 'child1');
    const defaultChild = new Construct(root, 'Resource');
    new Construct(root, 'child2');

    expect(Node.of(root).defaultChild).toBe(defaultChild);
  });
  test('returns the child with id "Default"', () => {
    const root = new Root();
    new Construct(root, 'child1');
    const defaultChild = new Construct(root, 'Default');
    new Construct(root, 'child2');

    expect(Node.of(root).defaultChild).toBe(defaultChild);
  });
  test('can override defaultChild', () => {
    const root = new Root();
    new Construct(root, 'Resource');
    const defaultChild = new Construct(root, 'OtherResource');
    Node.of(root).defaultChild = defaultChild;

    expect(Node.of(root).defaultChild).toBe(defaultChild);
  });
  test('returns "undefined" if there is no default', () => {
    const root = new Root();
    new Construct(root, 'child1');
    new Construct(root, 'child2');

    expect(Node.of(root).defaultChild).toBeUndefined();
  });
  test('fails if there are both "Resource" and "Default"', () => {
    const root = new Root();
    new Construct(root, 'child1');
    new Construct(root, 'Default');
    new Construct(root, 'child2');
    new Construct(root, 'Resource');

    expect(() => Node.of(root).defaultChild)
      .toThrow(/Cannot determine default child for . There is both a child with id "Resource" and id "Default"/);
  });
  test('constructs created in an Aspect are prepared', () => {
    const root = new Root();
    const construct = new Construct(root, 'Resource');
    Node.of(construct).applyAspect(new AddConstructAspect(construct));
    Node.of(root).prepare();
    // THEN
    const addedConstruct = Node.of(root).findAll(ConstructOrder.PREORDER)
      .find(child => Node.of(child).id === `AspectAdded-${Node.of(construct).id}`) as MyAlmostBeautifulConstruct;
    expect(addedConstruct.status).toBe('Prepared');
  });
});

describe('construct prepare', () => {

  it('created constructs are prepared', () => {
    const root = new Root();
    const construct01 = new MyAlmostBeautifulConstruct(root, 'Resource01');
    const construct02 = new MyAlmostBeautifulConstruct(root, 'Resource02');

    Node.of(root).prepare();
    // THEN
    expect(construct01.status).toEqual('Prepared');
    expect(construct02.status).toEqual('Prepared');
  });

  it('only constructs with onPrepare function are prepared', () => {
    const root = new Root();
    const construct01 = new MyAlmostBeautifulConstruct(root, 'Resource01');
    const construct02 = new MyMissingPrepareConstruct(root, 'Resource02');

    Node.of(root).prepare();
    // THEN
    expect(construct01.status).toEqual('Prepared');
    expect(construct02.status).not.toEqual('Prepared');
  });

  it('only constructs with onPrepare function are prepared', () => {
    const root = new Root();
    const construct01 = new MyAlmostBeautifulConstruct(root, 'Resource01') as any;

    // we try to force the error
    construct01.onPrepare = undefined;

    expect(() => Node.of(root).prepare())
      .toThrow(/expecting "onPrepare" to be a function/);
  });

});

function createTree(context?: any) {
  const root = new Root();
  const highChild = new Construct(root, 'HighChild');
  if (context) {
    Object.keys(context).forEach(key => Node.of(highChild).setContext(key, context[key]));
  }

  const child1 = new Construct(highChild, 'Child1');
  const child2 = new Construct(highChild, 'Child2');
  const child1_1 = new Construct(child1, 'Child11');
  const child1_2 = new Construct(child1, 'Child12');
  const child1_1_1 = new Construct(child1_1, 'Child111');
  const child2_1 = new Construct(child2, 'Child21');

  return {
    root, child1, child2, child1_1, child1_2, child1_1_1, child2_1,
  };
}

class MyMissingPrepareConstruct extends Construct {
  public status: string = 'PrePrepared';

  constructor(scope: Construct, id: string) {
    super(scope, id);
  }
}

class MyBeautifulConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);
  }
}

class MyAlmostBeautifulConstruct extends Construct {
  public status: string = 'PrePrepared';

  constructor(scope: Construct, id: string) {
    super(scope, id);
  }

  protected onPrepare() {
    this.status = 'Prepared';
  }
}

class AddConstructAspect implements IAspect {
  constructor(private readonly scope: Construct) {}

  visit(node: IConstruct): void {
    new MyAlmostBeautifulConstruct(this.scope, `AspectAdded-${Node.of(node).id}`);
  }
}
