import { Test } from 'nodeunit';
import { Construct, ConstructMetadata, Node, ConstructOrder, ValidationError, IConstruct, DefaultNodeFactory, IConstructIdValidator } from '../lib';
import { App as Root } from './util';
import { IAspect } from '../lib/aspect';

// tslint:disable:variable-name
// tslint:disable:max-line-length

export = {
  'the "Root" construct is a special construct which can be used as the root of the tree'(test: Test) {
    const root = new Root();
    const node = Node.of(root);
    test.equal(node.id, '', 'if not specified, name of a root construct is an empty string');
    test.ok(!node.scope, 'no parent');
    test.equal(node.children.length, 0);
    test.done();
  },

  'constructs cannot be created with an empty name unless they are root'(test: Test) {
    const root = new Root();
    test.throws(() => new Construct(root, ''));
    test.done();
  },

  'construct.name returns the name of the construct'(test: Test) {
    const t = createTree();

    test.equal(Node.of(t.child1).id, 'Child1');
    test.equal(Node.of(t.child2).id, 'Child2');
    test.equal(Node.of(t.child1_1).id, 'Child11');
    test.equal(Node.of(t.child1_2).id, 'Child12');
    test.equal(Node.of(t.child1_1_1).id, 'Child111');
    test.equal(Node.of(t.child2_1).id, 'Child21');

    test.done();
  },

  'construct id validator': {
    'is correctly inherited and used'(test: Test) {
      // GIVEN
      const errorMessage = 'Please you stop shouting!';
      const testValidator: IConstructIdValidator = {
        validateConstructId(id) {
          if (id && id == id.toUpperCase()) {
            throw new Error(errorMessage);
          }
        }
      };

      // WHEN
      const root = new Root({ nodeFactory: new DefaultNodeFactory(testValidator) });
      const step = new Construct(root, 'good');

      // THEN
      test.throws(() => new Construct(step, 'BAD'), errorMessage);

      test.done();
    },

    'can be overridden in the tree'(test: Test) {
      // GIVEN
      const errorMessage = 'Please you stop shouting!';
      const testValidator: IConstructIdValidator = {
        validateConstructId(id) {
          if (id && id == id.toUpperCase()) {
            throw new Error(errorMessage);
          }
        }
      };

      // WHEN
      const root = new Root({ nodeFactory: new DefaultNodeFactory(testValidator) });
      const notValidating: IConstructIdValidator = { validateConstructId: id => null };
      const step = new Construct(root, 'good', { nodeFactory: new DefaultNodeFactory(notValidating) });

      // THEN
      test.doesNotThrow(() => new Construct(step, 'BAD'));

      test.done();
    },
  },

  'construct id can use any character except the path separator'(test: Test) {
    const root = new Root();
    new Construct(root, 'valid');
    new Construct(root, 'ValiD');
    new Construct(root, 'Va123lid');
    new Construct(root, 'v');
    new Construct(root, '  invalid' );
    new Construct(root, 'invalid   ' );
    new Construct(root, '123invalid' );
    new Construct(root, 'in valid' );
    new Construct(root, 'in_Valid' );
    new Construct(root, 'in-Valid' );
    new Construct(root, 'in\\Valid' );
    new Construct(root, 'in.Valid' );
    test.done();
  },

  'if construct id contains path seperators, they will be replaced by double-dash'(test: Test) {
    const root = new Root();
    const c = new Construct(root, 'Boom/Boom/Bam');
    test.deepEqual(Node.of(c).id, 'Boom--Boom--Bam');
    test.done();
  },

  'if "undefined" is forcefully used as an "id", it will be treated as an empty string'(test: Test) {
    const c = new Construct(undefined as any, undefined as any);
    test.deepEqual(Node.of(c).id, '');
    test.done();
  },

  'construct.uniqueId returns a tree-unique alphanumeric id of this construct'(test: Test) {
    const root = new Root();

    const child1 = new Construct(root, 'This is the first child');
    const child2 = new Construct(child1, 'Second level');
    const c1 = new Construct(child2, 'My construct');
    const c2 = new Construct(child1, 'My construct');

    test.deepEqual(Node.of(c1).path, 'This is the first child/Second level/My construct');
    test.deepEqual(Node.of(c2).path, 'This is the first child/My construct');
    test.deepEqual(Node.of(c1).uniqueId, 'ThisisthefirstchildSecondlevelMyconstruct202131E0');
    test.deepEqual(Node.of(c2).uniqueId, 'ThisisthefirstchildMyconstruct8C288DF9');
    test.done();
  },

  'cannot calculate uniqueId if the construct path is ["Default"]'(test: Test) {
    const root = new Root();
    const c = new Construct(root, 'Default');
    test.throws(() => Node.of(c).uniqueId, /Unable to calculate a unique id for an empty set of components/);
    test.done();
  },

  'construct.getChildren() returns an array of all children'(test: Test) {
    const root = new Root();
    const child = new Construct(root, 'Child1');
    new Construct(root, 'Child2');
    test.equal(Node.of(child).children.length, 0, 'no children');
    test.equal(Node.of(root).children.length, 2, 'two children are expected');
    test.done();
  },

  'construct.findChild(name) can be used to retrieve a child from a parent'(test: Test) {
    const root = new Root();
    const child = new Construct(root, 'Contruct');
    test.strictEqual(Node.of(root).tryFindChild(Node.of(child).id), child, 'findChild(name) can be used to retrieve the child from a parent');
    test.ok(!Node.of(root).tryFindChild('NotFound'), 'findChild(name) returns undefined if the child is not found');
    test.done();
  },

  'construct.getChild(name) can be used to retrieve a child from a parent'(test: Test) {
    const root = new Root();
    const child = new Construct(root, 'Contruct');
    test.strictEqual(Node.of(root).findChild(Node.of(child).id), child, 'getChild(name) can be used to retrieve the child from a parent');
    test.throws(() => {
      Node.of(root).findChild('NotFound');
    }, '', 'getChild(name) returns undefined if the child is not found');
    test.done();
  },

  'construct.getContext(key) can be used to read a value from context defined at the root level'(test: Test) {
    const context = {
      ctx1: 12,
      ctx2: 'hello'
    };

    const t = createTree(context);
    test.equal(Node.of(t.child1_2).tryGetContext('ctx1'), 12);
    test.equal(Node.of(t.child1_1_1).tryGetContext('ctx2'), 'hello');
    test.done();
  },

  // tslint:disable-next-line:max-line-length
  'construct.setContext(k,v) sets context at some level and construct.getContext(key) will return the lowermost value defined in the stack'(test: Test) {
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

    test.equal(Node.of(highChild).tryGetContext('c1'), 'root');
    test.equal(Node.of(highChild).tryGetContext('c2'), 'root');
    test.equal(Node.of(highChild).tryGetContext('c3'), undefined);

    test.equal(Node.of(child1).tryGetContext('c1'), 'root');
    test.equal(Node.of(child1).tryGetContext('c2'), 'child1');
    test.equal(Node.of(child1).tryGetContext('c3'), 'child1');

    test.equal(Node.of(child2).tryGetContext('c1'), 'root');
    test.equal(Node.of(child2).tryGetContext('c2'), 'root');
    test.equal(Node.of(child2).tryGetContext('c3'), undefined);

    test.equal(Node.of(child3).tryGetContext('c1'), 'child3');
    test.equal(Node.of(child3).tryGetContext('c2'), 'child1');
    test.equal(Node.of(child3).tryGetContext('c3'), 'child1');
    test.equal(Node.of(child3).tryGetContext('c4'), 'child3');

    test.done();
  },

  'construct.setContext(key, value) can only be called before adding any children'(test: Test) {
    const root = new Root();
    new Construct(root, 'child1');
    test.throws(() => Node.of(root).setContext('k', 'v'));
    test.done();
  },

  'construct.pathParts returns an array of strings of all names from root to node'(test: Test) {
    const tree = createTree();
    test.deepEqual(Node.of(tree.root).path, '');
    test.deepEqual(Node.of(tree.child1_1_1).path, 'HighChild/Child1/Child11/Child111');
    test.deepEqual(Node.of(tree.child2).path, 'HighChild/Child2');
    test.done();
  },

  'if a root construct has a name, it should be included in the path'(test: Test) {
    const tree = createTree({});
    test.deepEqual(Node.of(tree.root).path, '');
    test.deepEqual(Node.of(tree.child1_1_1).path, 'HighChild/Child1/Child11/Child111');
    test.done();
  },

  'construct can not be created with the name of a sibling'(test: Test) {
    const root = new Root();

    // WHEN
    new Construct(root, 'SameName');

    // THEN: They have different paths
    test.throws(() => {
      new Construct(root, 'SameName');
    }, /There is already a Construct with name 'SameName' in App/);

    // WHEN
    const c0 = new Construct(root, 'c0');
    new Construct(c0, 'SameName');

    // THEN: They have different paths
    test.throws(() => {
      new Construct(c0, 'SameName');
    }, /There is already a Construct with name 'SameName' in Construct \[c0\]/);

    test.done();
  },

  'addMetadata(type, data) can be used to attach metadata to constructs FIND_ME'(test: Test) {
    const root = new Root();
    const con = new Construct(root, 'MyConstruct');
    test.deepEqual(Node.of(con).metadata, [], 'starts empty');

    const node = Node.of(con);
    node.addMetadata('key', 'value');
    node.addMetadata('number', 103);
    node.addMetadata('array', [ 123, 456 ]);

    test.deepEqual(node.metadata[0].type, 'key');
    test.deepEqual(node.metadata[0].data, 'value');
    test.deepEqual(node.metadata[1].data, 103);
    test.deepEqual(node.metadata[2].data, [ 123, 456 ]);

    test.ok(node.metadata[0].trace && node.metadata[0].trace[0].indexOf('FIND_ME') !== -1, 'First stack line should include this function\'s name');
    test.done();
  },

  'addMetadata(type, undefined/null) is ignored'(test: Test) {
    const root = new Root();
    const con = new Construct(root, 'Foo');
    const node = Node.of(con);
    node.addMetadata('Null', null);
    node.addMetadata('Undefined', undefined);
    node.addMetadata('True', true);
    node.addMetadata('False', false);
    node.addMetadata('Empty', '');

    const exists = (key: string) => node.metadata.find(x => x.type === key);

    test.ok(!exists('Null'));
    test.ok(!exists('Undefined'));
    test.ok(exists('True'));
    test.ok(exists('False'));
    test.ok(exists('Empty'));
    test.done();
  },

  'addWarning(message) can be used to add a "WARNING" message entry to the construct'(test: Test) {
    const root = new Root();
    const con = new Construct(root, 'MyConstruct');
    const node = Node.of(con);
    node.addWarning('This construct is deprecated, use the other one instead');
    test.deepEqual(node.metadata[0].type, ConstructMetadata.WARNING_METADATA_KEY);
    test.deepEqual(node.metadata[0].data, 'This construct is deprecated, use the other one instead');
    test.ok(node.metadata[0].trace && node.metadata[0].trace.length > 0);
    test.done();
  },

  'addError(message) can be used to add a "ERROR" message entry to the construct'(test: Test) {
    const root = new Root();
    const con = new Construct(root, 'MyConstruct');
    const node = Node.of(con);
    node.addError('Stop!');
    test.deepEqual(node.metadata[0].type, ConstructMetadata.ERROR_METADATA_KEY);
    test.deepEqual(node.metadata[0].data, 'Stop!');
    test.ok(node.metadata[0].trace && node.metadata[0].trace.length > 0);
    test.done();
  },

  'addInfo(message) can be used to add an "INFO" message entry to the construct'(test: Test) {
    const root = new Root();
    const con = new Construct(root, 'MyConstruct');
    const node = Node.of(con);
    node.addInfo('Hey there, how do you do?');
    test.deepEqual(node.metadata[0].type, ConstructMetadata.INFO_METADATA_KEY);
    test.deepEqual(node.metadata[0].data, 'Hey there, how do you do?');
    test.ok(node.metadata[0].trace && node.metadata[0].trace.length > 0);
    test.done();
  },

  'multiple children of the same type, with explicit names are welcome'(test: Test) {
    const root = new Root();
    new MyBeautifulConstruct(root, 'mbc1');
    new MyBeautifulConstruct(root, 'mbc2');
    new MyBeautifulConstruct(root, 'mbc3');
    new MyBeautifulConstruct(root, 'mbc4');
    test.ok(Node.of(root).children.length >= 4);
    test.done();
  },

  // tslint:disable-next-line:max-line-length
  'construct.onValidate() can be implemented to perform validation, node.validate() will return all errors from the subtree (DFS)'(test: Test) {

    class MyConstruct extends Construct {
      protected onValidate() {
        return [ 'my-error1', 'my-error2' ];
      }
    }

    class YourConstruct extends Construct {
      protected onValidate() {
        return [ 'your-error1' ];
      }
    }

    class TheirConstruct extends Construct {
      constructor(scope: Construct, id: string) {
        super(scope, id);

        new YourConstruct(this, 'YourConstruct');
      }

      protected onValidate() {
        return [ 'their-error' ];
      }
    }

    class TestStack extends Root {
      constructor() {
        super();

        new MyConstruct(this, 'MyConstruct');
        new TheirConstruct(this, 'TheirConstruct');
      }

      protected onValidate() {
        return  [ 'stack-error' ];
      }
    }

    const stack = new TestStack();

    const errors = Node.of(stack).validate()
      .map((v: ValidationError) => ({ path: Node.of(v.source).path, message: v.message }));

    // validate DFS
    test.deepEqual(errors, [
      { path: 'MyConstruct', message: 'my-error1' },
      { path: 'MyConstruct', message: 'my-error2' },
      { path: 'TheirConstruct/YourConstruct', message: 'your-error1' },
      { path: 'TheirConstruct', message: 'their-error' },
      { path: '', message: 'stack-error' }
    ]);

    test.done();
  },

  'construct.lock() protects against adding children anywhere under this construct (direct or indirect)'(test: Test) {

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
    test.throws(() => new Construct(c0a, 'fail1'), /Cannot add children to "c0a" during synthesis/);
    test.throws(() => new Construct(c1a, 'fail2'), /Cannot add children to "c0a\/c1a" during synthesis/);
    test.throws(() => new Construct(c1b, 'fail3'), /Cannot add children to "c0a\/c1b" during synthesis/);

    c0a.unlockMe();

    new Construct(c0a, 'c0aZ');
    new Construct(c1a, 'c1aZ');
    new Construct(c1b, 'c1bZ');

    test.done();
  },

  'findAll returns a list of all children in either DFS or BFS'(test: Test) {
    // GIVEN
    const c1 = new Construct(undefined as any, '1');
    const c2 = new Construct(c1, '2');
    new Construct(c1, '3');
    new Construct(c2, '4');
    new Construct(c2, '5');

    // THEN
    const node = Node.of(c1);
    test.deepEqual(node.findAll().map(x => Node.of(x).id), Node.of(c1).findAll(ConstructOrder.PREORDER).map(x => Node.of(x).id)); // default is PreOrder
    test.deepEqual(node.findAll(ConstructOrder.PREORDER).map(x => Node.of(x).id), [ '1', '2', '4', '5', '3' ]);
    test.deepEqual(node.findAll(ConstructOrder.POSTORDER).map(x => Node.of(x).id), [ '4', '5', '2', '3', '1' ]);
    test.done();
  },

  'ancestors returns a list of parents up to root'(test: Test) {
    const { child1_1_1 } = createTree();
    test.deepEqual(Node.of(child1_1_1).scopes.map(x => Node.of(x).id), [ '', 'HighChild', 'Child1', 'Child11', 'Child111' ]);
    test.done();
  },

  '"root" returns the root construct'(test: Test) {
    const { child1, child2, child1_1_1, root } = createTree();
    test.ok(Node.of(child1).root === root);
    test.ok(Node.of(child2).root === root);
    test.ok(Node.of(child1_1_1).root === root);
    test.done();
  },

  'defaultChild': {
    'returns the child with id "Resource"'(test: Test) {
      const root = new Root();
      new Construct(root, 'child1');
      const defaultChild = new Construct(root, 'Resource');
      new Construct(root, 'child2');

      test.same(Node.of(root).defaultChild, defaultChild);
      test.done();
    },
    'returns the child with id "Default"'(test: Test) {
      const root = new Root();
      new Construct(root, 'child1');
      const defaultChild = new Construct(root, 'Default');
      new Construct(root, 'child2');

      test.same(Node.of(root).defaultChild, defaultChild);
      test.done();
    },
    'can override defaultChild'(test: Test) {
      const root = new Root();
      new Construct(root, 'Resource');
      const defaultChild = new Construct(root, 'OtherResource');
      Node.of(root).defaultChild = defaultChild;

      test.same(Node.of(root).defaultChild, defaultChild);
      test.done();
    },
    'returns "undefined" if there is no default'(test: Test) {
      const root = new Root();
      new Construct(root, 'child1');
      new Construct(root, 'child2');

      test.equal(Node.of(root).defaultChild, undefined);
      test.done();
    },
    'fails if there are both "Resource" and "Default"'(test: Test) {
      const root = new Root();
      new Construct(root, 'child1');
      new Construct(root, 'Default');
      new Construct(root, 'child2');
      new Construct(root, 'Resource');

      test.throws(() => Node.of(root).defaultChild,
        /Cannot determine default child for . There is both a child with id "Resource" and id "Default"/);
      test.done();

    },
    'constructs created in an Aspect are prepared'(test: Test) {
      const root = new Root();
      const construct = new Construct(root, 'Resource');
      Node.of(construct).applyAspect(new AddConstructAspect(construct));
      Node.of(root).prepare();
      // THEN
      const addedConstruct = Node.of(root).findAll(ConstructOrder.PREORDER)
      .find(child => Node.of(child).id === `AspectAdded-${Node.of(construct).id}`) as MyAlmostBeautifulConstruct;
      test.deepEqual(addedConstruct.status, 'Prepared');
      test.done();
    },
  }
};

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
    root, child1, child2, child1_1, child1_2, child1_1_1, child2_1
  };
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
    this.status = 'Prepared'
  }
}

class AddConstructAspect implements IAspect {
  constructor(private readonly scope: Construct) {}

  visit(node: IConstruct): void {
    new MyAlmostBeautifulConstruct(this.scope, `AspectAdded-${Node.of(node).id}`);
  }
}
