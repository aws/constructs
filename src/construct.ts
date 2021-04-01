import { IAspect } from './aspect';
import { ConstructMetadata, MetadataEntry } from './metadata';
import { DependableTrait } from './private/dependency';
import { captureStackTrace } from './private/stack-trace';
import { makeLegacyUniqueId, addressOf } from './private/uniqueid';

const CONSTRUCT_NODE_PROPERTY_SYMBOL = Symbol.for('constructs.Construct.node');

/**
 * Represents a construct.
 */
export interface IConstruct { }

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
   */
  public static of(construct: IConstruct): Node {
    const node = (construct as any)[CONSTRUCT_NODE_PROPERTY_SYMBOL] as Node;
    if (!node) {
      throw new Error('construct does not have an associated node. All constructs must extend the "Construct" base class');
    }

    return node;
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
   * This is a a scope-unique id. To obtain an app-unique id for this construct, use `uniqueId`.
   */
  public readonly id: string;

  private _locked = false; // if this is "true", addChild will fail
  private readonly _aspects: IAspect[] = [];
  private readonly _children: { [id: string]: IConstruct } = { };
  private readonly _context: { [key: string]: any } = { };
  private readonly _metadata = new Array<MetadataEntry>();
  private readonly _dependencies = new Set<IConstruct>();
  private readonly invokedAspects: IAspect[] = [];
  private _defaultChild: IConstruct | undefined;
  private readonly _validations = new Array<IValidation>();
  private _addr?: string; // cache

  constructor(private readonly host: Construct, scope: IConstruct, id: string) {
    id = id || ''; // if undefined, convert to empty string

    this.id = sanitizeId(id);
    this.scope = scope;

    // We say that scope is required, but root scopes will bypass the type
    // checks and actually pass in 'undefined'.
    if (scope != null) {
      if (id === '') {
        throw new Error('Only root constructs may have an empty name');
      }

      // Has side effect so must be very last thing in constructor
      Node.of(scope).addChild(host, this.id);
    } else {
      // This is a root construct.
      this.id = id;
    }
  }

  /**
   * The full, absolute path of this construct in the tree.
   *
   * Components are separated by '/'.
   */
  public get path(): string {
    const components = this.scopes.slice(1).map(c => Node.of(c).id);
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
      this._addr = addressOf(this.scopes.map(c => Node.of(c).id));
    }

    return this._addr;
  }

  /**
   * A tree-global unique alphanumeric identifier for this construct. Includes
   * all components of the tree.
   *
   * @deprecated please avoid using this property and use `addr` to form unique names.
   * This algorithm uses MD5, which is not FIPS-complient and also excludes the
   * identity of the root construct from the calculation.
   */
  public get uniqueId(): string {
    const components = this.scopes.slice(1).map(c => Node.of(c).id);
    return components.length > 0 ? makeLegacyUniqueId(components) : '';
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

      for (const child of Node.of(c).children) {
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
      const names = this.children.map(c => Node.of(c).id);
      throw new Error('Cannot set context after children have been added: ' + names.join(','));
    }
    this._context[key] = value;
  }

  /**
   * Retrieves a value from tree context.
   *
   * Context is usually initialized at the root, but can be overridden at any point in the tree.
   *
   * @param key The context key
   * @returns The context value or `undefined` if there is no context value for thie key.
   */
  public tryGetContext(key: string): any {
    const value = this._context[key];
    if (value !== undefined) { return value; }

    return this.scope && Node.of(this.scope).tryGetContext(key);
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
   * @param fromFunction a function under which to restrict the metadata entry's stack trace (defaults to this.addMetadata)
   */
  public addMetadata(type: string, data: any, fromFunction?: any): void {
    if (data == null) {
      return;
    }

    const trace = this.tryGetContext(ConstructMetadata.DISABLE_STACK_TRACE_IN_METADATA)
      ? undefined
      : captureStackTrace(fromFunction || this.addMetadata);

    this._metadata.push({ type, data, trace });
  }

  /**
   * Adds a { "info": <message> } metadata entry to this construct.
   * The toolkit will display the info message when apps are synthesized.
   * @param message The info message.
   */
  public addInfo(message: string): void {
    this.addMetadata(ConstructMetadata.INFO_METADATA_KEY, message);
  }

  /**
   * Adds a { "warning": <message> } metadata entry to this construct.
   * The toolkit will display the warning when an app is synthesized, or fail
   * if run in --strict mode.
   * @param message The warning message.
   */
  public addWarning(message: string): void {
    this.addMetadata(ConstructMetadata.WARNING_METADATA_KEY, message);
  }

  /**
   * Adds an { "error": <message> } metadata entry to this construct.
   * The toolkit will fail synthesis when errors are reported.
   * @param message The error message.
   */
  public addError(message: string) {
    this.addMetadata(ConstructMetadata.ERROR_METADATA_KEY, message);
  }

  /**
   * Applies the aspect to this Constructs node
   */
  public applyAspect(aspect: IAspect): void {
    this._aspects.push(aspect);
    return;
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
      curr = Node.of(curr).scope;
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

    if (this.scope && Node.of(this.scope).locked) {
      return true;
    }

    return false;
  }

  /**
   * Add an ordering dependency on another Construct.
   *
   * All constructs in the dependency's scope will be deployed before any
   * construct in this construct's scope.
   */
  public addDependency(...dependencies: IConstruct[]) {
    for (const dependency of dependencies) {
      this._dependencies.add(dependency);
    }
  }

  /**
   * Return all dependencies registered on this node or any of its children
   */
  public get dependencies(): Dependency[] {
    const found = new Map<IConstruct, Set<IConstruct>>(); // Deduplication map
    const ret = new Array<Dependency>();

    for (const source of this.findAll()) {
      for (const dependable of Node.of(source)._dependencies) {
        for (const target of DependableTrait.get(dependable).dependencyRoots) {
          let foundTargets = found.get(source);
          if (!foundTargets) { found.set(source, foundTargets = new Set()); }

          if (!foundTargets.has(target)) {
            ret.push({ source, target });
            foundTargets.add(target);
          }
        }
      }
    }

    return ret;
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
   * @param validation
   */
  public addValidation(validation: IValidation) {
    this._validations.push(validation);
  }

  /**
   * Synthesizes a CloudAssembly from a construct tree.
   * @param options Synthesis options.
   */
  public synthesize(options: SynthesisOptions): void {
    // the three holy phases of synthesis: prepare, validate and synthesize

    // prepare
    this.prepare();

    // validate
    const validate = options.skipValidation === undefined ? true : !options.skipValidation;
    if (validate) {
      const errors = this.validate();
      if (errors.length > 0) {
        const errorList = errors.map(e => `[${Node.of(e.source).path}] ${e.message}`).join('\n  ');
        throw new Error(`Validation failed with the following errors:\n  ${errorList}`);
      }
    }

    // synthesize (leaves first)
    for (const construct of this.findAll(ConstructOrder.POSTORDER)) {
      const node = Node.of(construct);
      try {
        node._lock();
        const ctx = {
          ...options.sessionContext,
          outdir: options.outdir,
        };
        (construct as any).onSynthesize(ctx); // "as any" is needed because we want to keep "synthesize" protected
      } finally {
        node._unlock();
      }
    }
  }

  /**
   * Invokes "prepare" on all constructs (depth-first, post-order) in the tree under `node`.
   */
  public prepare() {
    // Aspects are applied root to leaf
    for (const construct of this.findAll(ConstructOrder.PREORDER)) {
      Node.of(construct).invokeAspects();
    }

    // since constructs can be added to the tree during invokeAspects, call findAll() to recreate the list.
    // use PREORDER.reverse() for backward compatability
    for (const construct of this.findAll(ConstructOrder.PREORDER).reverse()) {
      const cn = construct as any;
      if ('onPrepare' in cn) {
        if (typeof(cn.onPrepare) !== 'function') { throw new Error('expecting "onPrepare" to be a function'); }
        cn.onPrepare();
      }
    }
  }

  /**
   * Validates tree (depth-first, pre-order) and returns the list of all errors.
   * An empty list indicates that there are no errors.
   */
  public validate() {
    let errors = new Array<ValidationError>();

    for (const child of this.children) {
      errors = errors.concat(Node.of(child).validate());
    }

    const localErrors: string[] = (this.host as any).onValidate(); // "as any" is needed because we want to keep "validate" protected

    // invoke validations
    for (const v of this._validations) {
      localErrors.push(...v.validate());
    }

    return errors.concat(localErrors.map(msg => ({ source: this.host, message: msg })));
  }

  /**
   * Locks this construct from allowing more children to be added. After this
   * call, no more children can be added to this construct or to any children.
   * @internal
   */
  private _lock() {
    this._locked = true;
  }

  /**
   * Unlocks this costruct and allows mutations (adding children).
   * @internal
   */
  private _unlock() {
    this._locked = false;
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
      const name = this.id || '';
      const typeName = this.host.constructor.name;
      throw new Error(`There is already a Construct with name '${childName}' in ${typeName}${name.length > 0 ? ' [' + name + ']' : ''}`);
    }

    this._children[childName] = child;
  }

  /**
   * Triggers each aspect to invoke visit
   */
  private invokeAspects(): void {
    const descendants = this.findAll();
    for (const aspect of this._aspects) {
      if (this.invokedAspects.includes(aspect)) {
        continue;
      }
      descendants.forEach(member => aspect.visit(member));
      this.invokedAspects.push(aspect);
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
   * Creates a new construct node.
   *
   * @param scope The scope in which to define this construct
   * @param id The scoped construct ID. Must be unique amongst siblings. If
   * the ID includes a path separator (`/`), then it will be replaced by double
   * dash `--`.
   * @param options Options
   */
  constructor(scope: Construct, id: string, options: ConstructOptions = { }) {
    // attach the construct to the construct tree by creating a node
    const nodeFactory = options.nodeFactory ?? { createNode: (host, nodeScope, nodeId) => new Node(host, nodeScope, nodeId) };
    Object.defineProperty(this, CONSTRUCT_NODE_PROPERTY_SYMBOL, {
      value: nodeFactory.createNode(this, scope, id),
      enumerable: false,
      configurable: false,
    });

    // implement IDependable privately
    DependableTrait.implement(this, {
      dependencyRoots: [this],
    });
  }

  /**
   * Returns a string representation of this construct.
   */
  public toString() {
    return Node.of(this).path || '<root>';
  }

  /**
   * Validate the current construct.
   *
   * This method can be implemented by derived constructs in order to perform
   * validation logic. It is called on all constructs before synthesis.
   *
   * @returns An array of validation error messages, or an empty array if there the construct is valid.
   * @deprecated use `Node.addValidation()` to subscribe validation functions on this construct
   * instead of overriding this method.
   */
  protected onValidate(): string[] {
    return [];
  }

  /**
   * Perform final modifications before synthesis
   *
   * This method can be implemented by derived constructs in order to perform
   * final changes before synthesis. prepare() will be called after child
   * constructs have been prepared.
   *
   * This is an advanced framework feature. Only use this if you
   * understand the implications.
   */
  protected onPrepare(): void {
    return;
  }

  /**
   * Allows this construct to emit artifacts into the cloud assembly during synthesis.
   *
   * This method is usually implemented by framework-level constructs such as `Stack` and `Asset`
   * as they participate in synthesizing the cloud assembly.
   *
   * @param session The synthesis session.
   */
  protected onSynthesize(session: ISynthesisSession): void {
    ignore(session);
  }
}

/**
 * An error returned during the validation phase.
 */
export interface ValidationError {
  /**
   * The construct which emitted the error.
   */
  readonly source: Construct;

  /**
   * The error message.
   */
  readonly message: string;
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

/**
 * A single dependency
 */
export interface Dependency {
  /**
   * Source the dependency
   */
  readonly source: IConstruct;

  /**
   * Target of the dependency
   */
  readonly target: IConstruct;
}

/**
 * Represents a single session of synthesis. Passed into `construct.onSynthesize()` methods.
 */
export interface ISynthesisSession {
  /**
   * The output directory for this synthesis session.
   */
  readonly outdir: string;

  /**
   * Additional context passed to synthesizeNode through `sessionContext`.
   */
  [key: string]: any;
}

/**
 * Options for synthesis.
 */
export interface SynthesisOptions {
  /**
   * The output directory into which to synthesize the cloud assembly.
   * @default - creates a temporary directory
   */
  readonly outdir: string;

  /**
   * Whether synthesis should skip the validation phase.
   * @default false
   */
  readonly skipValidation?: boolean;

  /**
   * Additional context passed into the synthesis session object when `construct.synth` is called.
   * @default - no additional context is passed to `onSynthesize`
   */
  readonly sessionContext?: { [key: string]: any };
}

function ignore(_x: any) {
  return;
}

// Import this _after_ everything else to help node work the classes out in the correct order...
const PATH_SEP_REGEX = new RegExp(`${Node.PATH_SEP}`, 'g');

/**
 * Return a sanitized version of an arbitrary string, so it can be used as an ID
 */
function sanitizeId(id: string) {
  // Escape path seps as double dashes
  return id.replace(PATH_SEP_REGEX, '--');
}

/**
 * Options for creating constructs.
 */
export interface ConstructOptions {
  /**
   * A factory for attaching `Node`s to the construct.
   * @default - the default `Node` is associated
   */
  readonly nodeFactory?: INodeFactory;
}

/**
 * A factory for attaching `Node`s to the construct.
 */
export interface INodeFactory {
  /**
   * Returns a new `Node` associated with `host`.
   * @param host the associated construct
   * @param scope the construct's scope (parent)
   * @param id the construct id
   */
  createNode(host: Construct, scope: IConstruct, id: string): Node;
}
