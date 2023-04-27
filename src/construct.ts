import { Dependable, IDependable } from './dependency';
import { MetadataEntry } from './metadata';
import { captureStackTrace } from './private/stack-trace';
import { addressOf } from './private/uniqueid';

const CONSTRUCT_SYM = Symbol.for('constructs.Construct');

/**
 * Represents a construct.
 */
export interface IConstruct extends IDependable {
  /**
   * The tree node.
   */
  readonly node: Node;
}

/**
 * Represents the construct node in the scope tree.
 */
export class Node {
  /**
   * Separator used to delimit construct path components.
   */
  public static readonly PATH_SEP = '/';

  /**
   * Returns the node associated with a construct.
   * @param construct the construct
   *
   * @deprecated use `construct.node` instead
   */
  public static of(construct: IConstruct): Node {
    return construct.node;
  }

  /**
   * Returns the scope in which this construct is defined.
   *
   * The value is `undefined` at the root of the construct scope tree.
   */
  public readonly scope?: IConstruct;

  /**
   * The id of this construct within the current scope.
   *
   * This is a a scope-unique id. To obtain an app-unique id for this construct, use `addr`.
   */
  public readonly id: string;

  private _locked = false; // if this is "true", addChild will fail
  private readonly _children: { [id: string]: IConstruct } = { };
  private readonly _context: { [key: string]: any } = { };
  private readonly _metadata = new Array<MetadataEntry>();
  private readonly _dependencies = new Set<IDependable>();
  private _defaultChild: IConstruct | undefined;
  private readonly _validations = new Array<IValidation>();
  private _addr?: string; // cache

  public constructor(private readonly host: Construct, scope: IConstruct, id: string) {
    id = id ?? ''; // if undefined, convert to empty string

    this.id = sanitizeId(id);
    this.scope = scope;

    if (scope && !this.id) {
      throw new Error('Only root constructs may have an empty ID');
    }

    // add to parent scope
    if (!scope.node) {
      throw new Error('The provided scope does not have a node property. Please make sure you\'re running version 10+ of the constructs library with this project'); 
    }
    scope?.node.addChild(host, this.id);
  }

  /**
   * The full, absolute path of this construct in the tree.
   *
   * Components are separated by '/'.
   */
  public get path(): string {
    const components = this.scopes.filter(c => c.node.id).map(c => c.node.id);
    return components.join(Node.PATH_SEP);
  }

  /**
   * Returns an opaque tree-unique address for this construct.
   *
   * Addresses are 42 characters hexadecimal strings. They begin with "c8"
   * followed by 40 lowercase hexadecimal characters (0-9a-f).
   *
   * Addresses are calculated using a SHA-1 of the components of the construct
   * path.
   *
   * To enable refactorings of construct trees, constructs with the ID `Default`
   * will be excluded from the calculation. In those cases constructs in the
   * same tree may have the same addreess.
   *
   * @example c83a2846e506bcc5f10682b564084bca2d275709ee
   */
  public get addr(): string {
    if (!this._addr) {
      this._addr = addressOf(this.scopes.map(c => c.node.id));
    }

    return this._addr;
  }

  /**
   * Return a direct child by id, or undefined
   *
   * @param id Identifier of direct child
   * @returns the child if found, or undefined
   */
  public tryFindChild(id: string): IConstruct | undefined {
    return this._children[sanitizeId(id)];
  }

  /**
   * Return a direct child by id
   *
   * Throws an error if the child is not found.
   *
   * @param id Identifier of direct child
   * @returns Child with the given id.
   */
  public findChild(id: string): IConstruct {
    const ret = this.tryFindChild(id);
    if (!ret) {
      throw new Error(`No child with id: '${id}'`);
    }
    return ret;
  }

  /**
   * Returns the child construct that has the id `Default` or `Resource"`.
   * This is usually the construct that provides the bulk of the underlying functionality.
   * Useful for modifications of the underlying construct that are not available at the higher levels.
   *
   * @throws if there is more than one child
   * @returns a construct or undefined if there is no default child
   */
  public get defaultChild(): IConstruct | undefined {
    if (this._defaultChild !== undefined) {
      return this._defaultChild;
    }

    const resourceChild = this.tryFindChild('Resource');
    const defaultChild = this.tryFindChild('Default');
    if (resourceChild && defaultChild) {
      throw new Error(`Cannot determine default child for ${this.path}. There is both a child with id "Resource" and id "Default"`);
    }

    return defaultChild || resourceChild;
  }

  /**
   * Override the defaultChild property.
   *
   * This should only be used in the cases where the correct
   * default child is not named 'Resource' or 'Default' as it
   * should be.
   *
   * If you set this to undefined, the default behavior of finding
   * the child named 'Resource' or 'Default' will be used.
   */
  public set defaultChild(value: IConstruct | undefined) {
    this._defaultChild = value;
  }

  /**
   * All direct children of this construct.
   */
  public get children() {
    return Object.values(this._children);
  }

  /**
   * Return this construct and all of its children in the given order
   */
  public findAll(order: ConstructOrder = ConstructOrder.PREORDER): IConstruct[] {
    const ret = new Array<IConstruct>();
    visit(this.host);
    return ret;

    function visit(c: IConstruct) {
      if (order === ConstructOrder.PREORDER) {
        ret.push(c);
      }

      for (const child of c.node.children) {
        visit(child);
      }

      if (order === ConstructOrder.POSTORDER) {
        ret.push(c);
      }
    }
  }

  /**
   * This can be used to set contextual values.
   * Context must be set before any children are added, since children may consult context info during construction.
   * If the key already exists, it will be overridden.
   * @param key The context key
   * @param value The context value
   */
  public setContext(key: string, value: any) {
    if (this.children.length > 0) {
      const names = this.children.map(c => c.node.id);
      throw new Error('Cannot set context after children have been added: ' + names.join(','));
    }
    this._context[key] = value;
  }

  /**
   * Retrieves a value from tree context if present. Otherwise, would throw an error.
   *
   * Context is usually initialized at the root, but can be overridden at any point in the tree.
   *
   * @param key The context key
   * @returns The context value or throws error if there is no context value for this key
   */
  public getContext(key: string): any {
    const value = this._context[key];

    if (value !== undefined) { return value; }

    if (value === undefined && !this.scope?.node) {
      throw new Error(`No context value present for ${key} key`);
    }

    return this.scope && this.scope.node.getContext(key);
  }

  /**
   * Retrieves a value from tree context.
   *
   * Context is usually initialized at the root, but can be overridden at any point in the tree.
   *
   * @param key The context key
   * @returns The context value or `undefined` if there is no context value for this key.
   */
  public tryGetContext(key: string): any {
    const value = this._context[key];
    if (value !== undefined) { return value; }

    return this.scope && this.scope.node.tryGetContext(key);
  }

  /**
   * An immutable array of metadata objects associated with this construct.
   * This can be used, for example, to implement support for deprecation notices, source mapping, etc.
   */
  public get metadata() {
    return [...this._metadata];
  }

  /**
   * Adds a metadata entry to this construct.
   * Entries are arbitrary values and will also include a stack trace to allow tracing back to
   * the code location for when the entry was added. It can be used, for example, to include source
   * mapping in CloudFormation templates to improve diagnostics.
   *
   * @param type a string denoting the type of metadata
   * @param data the value of the metadata (can be a Token). If null/undefined, metadata will not be added.
   * @param options options
   */
  public addMetadata(type: string, data: any, options: MetadataOptions = { }): void {
    if (data == null) {
      return;
    }

    const shouldTrace = options.stackTrace ?? false;
    const trace = shouldTrace ? captureStackTrace(options.traceFromFunction ?? this.addMetadata) : undefined;
    this._metadata.push({ type, data, trace });
  }

  /**
   * All parent scopes of this construct.
   *
   * @returns a list of parent scopes. The last element in the list will always
   * be the current construct and the first element will be the root of the
   * tree.
   */
  public get scopes(): IConstruct[] {
    const ret = new Array<IConstruct>();

    let curr: IConstruct | undefined = this.host;
    while (curr) {
      ret.unshift(curr);
      curr = curr.node.scope;
    }

    return ret;
  }

  /**
   * Returns the root of the construct tree.
   * @returns The root of the construct tree.
   */
  public get root() {
    return this.scopes[0];
  }

  /**
   * Returns true if this construct or the scopes in which it is defined are
   * locked.
   */
  public get locked() {
    if (this._locked) {
      return true;
    }

    if (this.scope && this.scope.node.locked) {
      return true;
    }

    return false;
  }

  /**
   * Add an ordering dependency on another construct.
   *
   * An `IDependable`
   */
  public addDependency(...deps: IDependable[]) {
    for (const d of deps) {
      this._dependencies.add(d);
    }
  }

  /**
   * Return all dependencies registered on this node (non-recursive).
   */
  public get dependencies(): IConstruct[] {
    const result = new Array<IConstruct>();
    for (const dep of this._dependencies) {
      for (const root of Dependable.of(dep).dependencyRoots) {
        result.push(root);
      }
    }

    return result;
  }

  /**
   * Remove the child with the given name, if present.
   *
   * @returns Whether a child with the given name was deleted.
   * @experimental
   */
  public tryRemoveChild(childName: string): boolean {
    if (!(childName in this._children)) { return false; }
    delete this._children[childName];
    return true;
  }

  /**
   * Adds a validation to this construct.
   *
   * When `node.validate()` is called, the `validate()` method will be called on
   * all validations and all errors will be returned.
   *
   * @param validation The validation object
   */
  public addValidation(validation: IValidation) {
    this._validations.push(validation);
  }

  /**
   * Validates this construct.
   *
   * Invokes the `validate()` method on all validations added through
   * `addValidation()`.
   *
   * @returns an array of validation error messages associated with this
   * construct.
   */
  public validate(): string[] {
    const deprecated = ['validate', 'onValidate', 'synthesize', 'onSynthesize', 'prepare', 'onPrepare'];
    for (const method of deprecated) {
      if (typeof((this.host as any)[method]) === 'function') {
        throw new Error(`the construct "${this.path}" has a "${method}()" method which is no longer supported. Use "construct.node.addValidation()" to add validations to a construct`);
      }
    }

    const errors = new Array<string>();
    for (const v of this._validations) {
      errors.push(...v.validate());
    }

    return errors;
  }

  /**
   * Locks this construct from allowing more children to be added. After this
   * call, no more children can be added to this construct or to any children.
   */
  public lock() {
    this._locked = true;
  }

  /**
   * Adds a child construct to this node.
   *
   * @param child The child construct
   * @param childName The type name of the child construct.
   * @returns The resolved path part name of the child
   */
  private addChild(child: Construct, childName: string) {
    if (this.locked) {

      // special error if root is locked
      if (!this.path) {
        throw new Error('Cannot add children during synthesis');
      }

      throw new Error(`Cannot add children to "${this.path}" during synthesis`);
    }

    if (childName in this._children) {
      const name = this.id ?? '';
      const typeName = this.host.constructor.name;
      throw new Error(`There is already a Construct with name '${childName}' in ${typeName}${name.length > 0 ? ' [' + name + ']' : ''}`);
    }

    if (!childName && this.id) {
      throw new Error(`cannot add a nameless construct to the named scope: ${this.path}`);
    }

    this._children[childName] = child;

    if (Object.keys(this._children).length > 1 && Object.keys(this._children).filter(x => !x).length > 0) {
      throw new Error('only a single construct is allowed in a scope if it has an empty name');
    }
  }
}

/**
 * Represents the building block of the construct graph.
 *
 * All constructs besides the root construct must be created within the scope of
 * another construct.
 */
export class Construct implements IConstruct {
  /**
   * Checks if `x` is a construct.
   *
   * Use this method instead of `instanceof` to properly detect `Construct`
   * instances, even when the construct library is symlinked.
   *
   * Explanation: in JavaScript, multiple copies of the `constructs` library on
   * disk are seen as independent, completely different libraries. As a
   * consequence, the class `Construct` in each copy of the `constructs` library
   * is seen as a different class, and an instance of one class will not test as
   * `instanceof` the other class. `npm install` will not create installations
   * like this, but users may manually symlink construct libraries together or
   * use a monorepo tool: in those cases, multiple copies of the `constructs`
   * library can be accidentally installed, and `instanceof` will behave
   * unpredictably. It is safest to avoid using `instanceof`, and using
   * this type-testing method instead.
   *
   * @returns true if `x` is an object created from a class which extends `Construct`.
   * @param x Any object
   */
  public static isConstruct(x: any): x is Construct {
    return x && typeof x === 'object' && x[CONSTRUCT_SYM];
  }

  /**
   * The tree node.
   */
  public readonly node: Node;

  /**
   * Creates a new construct node.
   *
   * @param scope The scope in which to define this construct
   * @param id The scoped construct ID. Must be unique amongst siblings. If
   * the ID includes a path separator (`/`), then it will be replaced by double
   * dash `--`.
   */
  constructor(scope: Construct, id: string) {
    this.node = new Node(this, scope, id);

    // implement IDependable privately
    Dependable.implement(this, {
      dependencyRoots: [this],
    });
  }

  /**
   * Returns a string representation of this construct.
   */
  public toString() {
    return this.node.path || '<root>';
  }
}

/**
 * Implement this interface in order for the construct to be able to validate itself.
 */
export interface IValidation {
  /**
   * Validate the current construct.
   *
   * This method can be implemented by derived constructs in order to perform
   * validation logic. It is called on all constructs before synthesis.
   *
   * @returns An array of validation error messages, or an empty array if there the construct is valid.
   */
  validate(): string[];
}

/**
 * In what order to return constructs
 */
export enum ConstructOrder {
  /**
   * Depth-first, pre-order
   */
  PREORDER,

  /**
   * Depth-first, post-order (leaf nodes first)
   */
  POSTORDER
}

const PATH_SEP_REGEX = new RegExp(`${Node.PATH_SEP}`, 'g');

/**
 * Return a sanitized version of an arbitrary string, so it can be used as an ID
 */
function sanitizeId(id: string) {
  // Escape path seps as double dashes
  return id.replace(PATH_SEP_REGEX, '--');
}

/**
 * Options for `construct.addMetadata()`.
 */
export interface MetadataOptions {
  /**
   * Include stack trace with metadata entry.
   * @default false
   */
  readonly stackTrace?: boolean;

  /**
   * A JavaScript function to begin tracing from.
   *
   * This option is ignored unless `stackTrace` is `true`.
   *
   * @default addMetadata()
   */
  readonly traceFromFunction?: any;
}

// Mark all instances of 'Construct'
Object.defineProperty(Construct.prototype, CONSTRUCT_SYM, {
  value: true,
  enumerable: false,
  writable: false,
});
