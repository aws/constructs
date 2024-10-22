# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Construct <a name="Construct" id="constructs.Construct"></a>

- *Implements:* <a href="#constructs.IConstruct">IConstruct</a>

Represents the building block of the construct graph.

All constructs besides the root construct must be created within the scope of
another construct.

#### Initializers <a name="Initializers" id="constructs.Construct.Initializer"></a>

```typescript
import { Construct } from 'constructs'

new Construct(scope: Construct, id: string, options?: ConstructOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#constructs.Construct.Initializer.parameter.scope">scope</a></code> | <code><a href="#constructs.Construct">Construct</a></code> | The scope in which to define this construct. |
| <code><a href="#constructs.Construct.Initializer.parameter.id">id</a></code> | <code>string</code> | The scoped construct ID. |
| <code><a href="#constructs.Construct.Initializer.parameter.options">options</a></code> | <code><a href="#constructs.ConstructOptions">ConstructOptions</a></code> | Options. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="constructs.Construct.Initializer.parameter.scope"></a>

- *Type:* <a href="#constructs.Construct">Construct</a>

The scope in which to define this construct.

---

##### `id`<sup>Required</sup> <a name="id" id="constructs.Construct.Initializer.parameter.id"></a>

- *Type:* string

The scoped construct ID.

Must be unique amongst siblings. If
the ID includes a path separator (`/`), then it will be replaced by double
dash `--`.

---

##### `options`<sup>Optional</sup> <a name="options" id="constructs.Construct.Initializer.parameter.options"></a>

- *Type:* <a href="#constructs.ConstructOptions">ConstructOptions</a>

Options.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#constructs.Construct.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="constructs.Construct.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.




## Structs <a name="Structs" id="Structs"></a>

### ConstructOptions <a name="ConstructOptions" id="constructs.ConstructOptions"></a>

Options for creating constructs.

#### Initializer <a name="Initializer" id="constructs.ConstructOptions.Initializer"></a>

```typescript
import { ConstructOptions } from 'constructs'

const constructOptions: ConstructOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#constructs.ConstructOptions.property.nodeFactory">nodeFactory</a></code> | <code><a href="#constructs.INodeFactory">INodeFactory</a></code> | A factory for attaching `Node`s to the construct. |

---

##### `nodeFactory`<sup>Optional</sup> <a name="nodeFactory" id="constructs.ConstructOptions.property.nodeFactory"></a>

```typescript
public readonly nodeFactory: INodeFactory;
```

- *Type:* <a href="#constructs.INodeFactory">INodeFactory</a>
- *Default:* the default `Node` is associated

A factory for attaching `Node`s to the construct.

---

### Dependency <a name="Dependency" id="constructs.Dependency"></a>

A single dependency.

#### Initializer <a name="Initializer" id="constructs.Dependency.Initializer"></a>

```typescript
import { Dependency } from 'constructs'

const dependency: Dependency = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#constructs.Dependency.property.source">source</a></code> | <code><a href="#constructs.IConstruct">IConstruct</a></code> | Source the dependency. |
| <code><a href="#constructs.Dependency.property.target">target</a></code> | <code><a href="#constructs.IConstruct">IConstruct</a></code> | Target of the dependency. |

---

##### `source`<sup>Required</sup> <a name="source" id="constructs.Dependency.property.source"></a>

```typescript
public readonly source: IConstruct;
```

- *Type:* <a href="#constructs.IConstruct">IConstruct</a>

Source the dependency.

---

##### `target`<sup>Required</sup> <a name="target" id="constructs.Dependency.property.target"></a>

```typescript
public readonly target: IConstruct;
```

- *Type:* <a href="#constructs.IConstruct">IConstruct</a>

Target of the dependency.

---

### MetadataEntry <a name="MetadataEntry" id="constructs.MetadataEntry"></a>

An entry in the construct metadata table.

#### Initializer <a name="Initializer" id="constructs.MetadataEntry.Initializer"></a>

```typescript
import { MetadataEntry } from 'constructs'

const metadataEntry: MetadataEntry = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#constructs.MetadataEntry.property.data">data</a></code> | <code>any</code> | The data. |
| <code><a href="#constructs.MetadataEntry.property.type">type</a></code> | <code>string</code> | The metadata entry type. |
| <code><a href="#constructs.MetadataEntry.property.trace">trace</a></code> | <code>string[]</code> | Stack trace. |

---

##### `data`<sup>Required</sup> <a name="data" id="constructs.MetadataEntry.property.data"></a>

```typescript
public readonly data: any;
```

- *Type:* any

The data.

---

##### `type`<sup>Required</sup> <a name="type" id="constructs.MetadataEntry.property.type"></a>

```typescript
public readonly type: string;
```

- *Type:* string

The metadata entry type.

---

##### `trace`<sup>Optional</sup> <a name="trace" id="constructs.MetadataEntry.property.trace"></a>

```typescript
public readonly trace: string[];
```

- *Type:* string[]
- *Default:* no trace information

Stack trace.

Can be omitted by setting the context key
`ConstructMetadata.DISABLE_STACK_TRACE_IN_METADATA` to 1.

---

### SynthesisOptions <a name="SynthesisOptions" id="constructs.SynthesisOptions"></a>

Options for synthesis.

#### Initializer <a name="Initializer" id="constructs.SynthesisOptions.Initializer"></a>

```typescript
import { SynthesisOptions } from 'constructs'

const synthesisOptions: SynthesisOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#constructs.SynthesisOptions.property.outdir">outdir</a></code> | <code>string</code> | The output directory into which to synthesize the cloud assembly. |
| <code><a href="#constructs.SynthesisOptions.property.sessionContext">sessionContext</a></code> | <code>{[ key: string ]: any}</code> | Additional context passed into the synthesis session object when `construct.synth` is called. |
| <code><a href="#constructs.SynthesisOptions.property.skipValidation">skipValidation</a></code> | <code>boolean</code> | Whether synthesis should skip the validation phase. |

---

##### `outdir`<sup>Required</sup> <a name="outdir" id="constructs.SynthesisOptions.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string
- *Default:* creates a temporary directory

The output directory into which to synthesize the cloud assembly.

---

##### `sessionContext`<sup>Optional</sup> <a name="sessionContext" id="constructs.SynthesisOptions.property.sessionContext"></a>

```typescript
public readonly sessionContext: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}
- *Default:* no additional context is passed to `onSynthesize`

Additional context passed into the synthesis session object when `construct.synth` is called.

---

##### `skipValidation`<sup>Optional</sup> <a name="skipValidation" id="constructs.SynthesisOptions.property.skipValidation"></a>

```typescript
public readonly skipValidation: boolean;
```

- *Type:* boolean
- *Default:* false

Whether synthesis should skip the validation phase.

---

### ValidationError <a name="ValidationError" id="constructs.ValidationError"></a>

An error returned during the validation phase.

#### Initializer <a name="Initializer" id="constructs.ValidationError.Initializer"></a>

```typescript
import { ValidationError } from 'constructs'

const validationError: ValidationError = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#constructs.ValidationError.property.message">message</a></code> | <code>string</code> | The error message. |
| <code><a href="#constructs.ValidationError.property.source">source</a></code> | <code><a href="#constructs.Construct">Construct</a></code> | The construct which emitted the error. |

---

##### `message`<sup>Required</sup> <a name="message" id="constructs.ValidationError.property.message"></a>

```typescript
public readonly message: string;
```

- *Type:* string

The error message.

---

##### `source`<sup>Required</sup> <a name="source" id="constructs.ValidationError.property.source"></a>

```typescript
public readonly source: Construct;
```

- *Type:* <a href="#constructs.Construct">Construct</a>

The construct which emitted the error.

---

## Classes <a name="Classes" id="Classes"></a>

### ConstructMetadata <a name="ConstructMetadata" id="constructs.ConstructMetadata"></a>

Metadata keys used by constructs.




#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#constructs.ConstructMetadata.property.DISABLE_STACK_TRACE_IN_METADATA">DISABLE_STACK_TRACE_IN_METADATA</a></code> | <code>string</code> | If set in the construct's context, omits stack traces from metadata entries. |
| <code><a href="#constructs.ConstructMetadata.property.ERROR_METADATA_KEY">ERROR_METADATA_KEY</a></code> | <code>string</code> | Context type for error level messages. |
| <code><a href="#constructs.ConstructMetadata.property.INFO_METADATA_KEY">INFO_METADATA_KEY</a></code> | <code>string</code> | Context type for info level messages. |
| <code><a href="#constructs.ConstructMetadata.property.WARNING_METADATA_KEY">WARNING_METADATA_KEY</a></code> | <code>string</code> | Context type for warning level messages. |

---

##### `DISABLE_STACK_TRACE_IN_METADATA`<sup>Required</sup> <a name="DISABLE_STACK_TRACE_IN_METADATA" id="constructs.ConstructMetadata.property.DISABLE_STACK_TRACE_IN_METADATA"></a>

```typescript
public readonly DISABLE_STACK_TRACE_IN_METADATA: string;
```

- *Type:* string

If set in the construct's context, omits stack traces from metadata entries.

---

##### `ERROR_METADATA_KEY`<sup>Required</sup> <a name="ERROR_METADATA_KEY" id="constructs.ConstructMetadata.property.ERROR_METADATA_KEY"></a>

```typescript
public readonly ERROR_METADATA_KEY: string;
```

- *Type:* string

Context type for error level messages.

---

##### `INFO_METADATA_KEY`<sup>Required</sup> <a name="INFO_METADATA_KEY" id="constructs.ConstructMetadata.property.INFO_METADATA_KEY"></a>

```typescript
public readonly INFO_METADATA_KEY: string;
```

- *Type:* string

Context type for info level messages.

---

##### `WARNING_METADATA_KEY`<sup>Required</sup> <a name="WARNING_METADATA_KEY" id="constructs.ConstructMetadata.property.WARNING_METADATA_KEY"></a>

```typescript
public readonly WARNING_METADATA_KEY: string;
```

- *Type:* string

Context type for warning level messages.

---

### Node <a name="Node" id="constructs.Node"></a>

Represents the construct node in the scope tree.

#### Initializers <a name="Initializers" id="constructs.Node.Initializer"></a>

```typescript
import { Node } from 'constructs'

new Node(host: Construct, scope: IConstruct, id: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#constructs.Node.Initializer.parameter.host">host</a></code> | <code><a href="#constructs.Construct">Construct</a></code> | *No description.* |
| <code><a href="#constructs.Node.Initializer.parameter.scope">scope</a></code> | <code><a href="#constructs.IConstruct">IConstruct</a></code> | *No description.* |
| <code><a href="#constructs.Node.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `host`<sup>Required</sup> <a name="host" id="constructs.Node.Initializer.parameter.host"></a>

- *Type:* <a href="#constructs.Construct">Construct</a>

---

##### `scope`<sup>Required</sup> <a name="scope" id="constructs.Node.Initializer.parameter.scope"></a>

- *Type:* <a href="#constructs.IConstruct">IConstruct</a>

---

##### `id`<sup>Required</sup> <a name="id" id="constructs.Node.Initializer.parameter.id"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#constructs.Node.addDependency">addDependency</a></code> | Add an ordering dependency on another Construct. |
| <code><a href="#constructs.Node.addError">addError</a></code> | Adds an { "error": <message> } metadata entry to this construct. |
| <code><a href="#constructs.Node.addInfo">addInfo</a></code> | Adds a { "info": <message> } metadata entry to this construct. |
| <code><a href="#constructs.Node.addMetadata">addMetadata</a></code> | Adds a metadata entry to this construct. |
| <code><a href="#constructs.Node.addValidation">addValidation</a></code> | Adds a validation to this construct. |
| <code><a href="#constructs.Node.addWarning">addWarning</a></code> | Adds a { "warning": <message> } metadata entry to this construct. |
| <code><a href="#constructs.Node.applyAspect">applyAspect</a></code> | Applies the aspect to this Constructs node. |
| <code><a href="#constructs.Node.findAll">findAll</a></code> | Return this construct and all of its children in the given order. |
| <code><a href="#constructs.Node.findChild">findChild</a></code> | Return a direct child by id. |
| <code><a href="#constructs.Node.prepare">prepare</a></code> | Invokes "prepare" on all constructs (depth-first, post-order) in the tree under `node`. |
| <code><a href="#constructs.Node.setContext">setContext</a></code> | This can be used to set contextual values. |
| <code><a href="#constructs.Node.synthesize">synthesize</a></code> | Synthesizes a CloudAssembly from a construct tree. |
| <code><a href="#constructs.Node.tryFindChild">tryFindChild</a></code> | Return a direct child by id, or undefined. |
| <code><a href="#constructs.Node.tryGetContext">tryGetContext</a></code> | Retrieves a value from tree context. |
| <code><a href="#constructs.Node.tryRemoveChild">tryRemoveChild</a></code> | Remove the child with the given name, if present. |
| <code><a href="#constructs.Node.validate">validate</a></code> | Validates tree (depth-first, pre-order) and returns the list of all errors. |

---

##### `addDependency` <a name="addDependency" id="constructs.Node.addDependency"></a>

```typescript
public addDependency(dependencies: ...IConstruct[]): void
```

Add an ordering dependency on another Construct.

All constructs in the dependency's scope will be deployed before any
construct in this construct's scope.

###### `dependencies`<sup>Required</sup> <a name="dependencies" id="constructs.Node.addDependency.parameter.dependencies"></a>

- *Type:* ...<a href="#constructs.IConstruct">IConstruct</a>[]

---

##### `addError` <a name="addError" id="constructs.Node.addError"></a>

```typescript
public addError(message: string): void
```

Adds an { "error": <message> } metadata entry to this construct.

The toolkit will fail synthesis when errors are reported.

###### `message`<sup>Required</sup> <a name="message" id="constructs.Node.addError.parameter.message"></a>

- *Type:* string

The error message.

---

##### `addInfo` <a name="addInfo" id="constructs.Node.addInfo"></a>

```typescript
public addInfo(message: string): void
```

Adds a { "info": <message> } metadata entry to this construct.

The toolkit will display the info message when apps are synthesized.

###### `message`<sup>Required</sup> <a name="message" id="constructs.Node.addInfo.parameter.message"></a>

- *Type:* string

The info message.

---

##### `addMetadata` <a name="addMetadata" id="constructs.Node.addMetadata"></a>

```typescript
public addMetadata(type: string, data: any, fromFunction?: any): void
```

Adds a metadata entry to this construct.

Entries are arbitrary values and will also include a stack trace to allow tracing back to
the code location for when the entry was added. It can be used, for example, to include source
mapping in CloudFormation templates to improve diagnostics.

###### `type`<sup>Required</sup> <a name="type" id="constructs.Node.addMetadata.parameter.type"></a>

- *Type:* string

a string denoting the type of metadata.

---

###### `data`<sup>Required</sup> <a name="data" id="constructs.Node.addMetadata.parameter.data"></a>

- *Type:* any

the value of the metadata (can be a Token).

If null/undefined, metadata will not be added.

---

###### `fromFunction`<sup>Optional</sup> <a name="fromFunction" id="constructs.Node.addMetadata.parameter.fromFunction"></a>

- *Type:* any

a function under which to restrict the metadata entry's stack trace (defaults to this.addMetadata).

---

##### `addValidation` <a name="addValidation" id="constructs.Node.addValidation"></a>

```typescript
public addValidation(validation: IValidation): void
```

Adds a validation to this construct.

When `node.validate()` is called, the `validate()` method will be called on
all validations and all errors will be returned.

###### `validation`<sup>Required</sup> <a name="validation" id="constructs.Node.addValidation.parameter.validation"></a>

- *Type:* <a href="#constructs.IValidation">IValidation</a>

---

##### `addWarning` <a name="addWarning" id="constructs.Node.addWarning"></a>

```typescript
public addWarning(message: string): void
```

Adds a { "warning": <message> } metadata entry to this construct.

The toolkit will display the warning when an app is synthesized, or fail
if run in --strict mode.

###### `message`<sup>Required</sup> <a name="message" id="constructs.Node.addWarning.parameter.message"></a>

- *Type:* string

The warning message.

---

##### `applyAspect` <a name="applyAspect" id="constructs.Node.applyAspect"></a>

```typescript
public applyAspect(aspect: IAspect): void
```

Applies the aspect to this Constructs node.

###### `aspect`<sup>Required</sup> <a name="aspect" id="constructs.Node.applyAspect.parameter.aspect"></a>

- *Type:* <a href="#constructs.IAspect">IAspect</a>

---

##### `findAll` <a name="findAll" id="constructs.Node.findAll"></a>

```typescript
public findAll(order?: ConstructOrder): IConstruct[]
```

Return this construct and all of its children in the given order.

###### `order`<sup>Optional</sup> <a name="order" id="constructs.Node.findAll.parameter.order"></a>

- *Type:* <a href="#constructs.ConstructOrder">ConstructOrder</a>

---

##### `findChild` <a name="findChild" id="constructs.Node.findChild"></a>

```typescript
public findChild(id: string): IConstruct
```

Return a direct child by id.

Throws an error if the child is not found.

###### `id`<sup>Required</sup> <a name="id" id="constructs.Node.findChild.parameter.id"></a>

- *Type:* string

Identifier of direct child.

---

##### `prepare` <a name="prepare" id="constructs.Node.prepare"></a>

```typescript
public prepare(): void
```

Invokes "prepare" on all constructs (depth-first, post-order) in the tree under `node`.

##### `setContext` <a name="setContext" id="constructs.Node.setContext"></a>

```typescript
public setContext(key: string, value: any): void
```

This can be used to set contextual values.

Context must be set before any children are added, since children may consult context info during construction.
If the key already exists, it will be overridden.

###### `key`<sup>Required</sup> <a name="key" id="constructs.Node.setContext.parameter.key"></a>

- *Type:* string

The context key.

---

###### `value`<sup>Required</sup> <a name="value" id="constructs.Node.setContext.parameter.value"></a>

- *Type:* any

The context value.

---

##### `synthesize` <a name="synthesize" id="constructs.Node.synthesize"></a>

```typescript
public synthesize(options: SynthesisOptions): void
```

Synthesizes a CloudAssembly from a construct tree.

###### `options`<sup>Required</sup> <a name="options" id="constructs.Node.synthesize.parameter.options"></a>

- *Type:* <a href="#constructs.SynthesisOptions">SynthesisOptions</a>

Synthesis options.

---

##### `tryFindChild` <a name="tryFindChild" id="constructs.Node.tryFindChild"></a>

```typescript
public tryFindChild(id: string): IConstruct
```

Return a direct child by id, or undefined.

###### `id`<sup>Required</sup> <a name="id" id="constructs.Node.tryFindChild.parameter.id"></a>

- *Type:* string

Identifier of direct child.

---

##### `tryGetContext` <a name="tryGetContext" id="constructs.Node.tryGetContext"></a>

```typescript
public tryGetContext(key: string): any
```

Retrieves a value from tree context.

Context is usually initialized at the root, but can be overridden at any point in the tree.

###### `key`<sup>Required</sup> <a name="key" id="constructs.Node.tryGetContext.parameter.key"></a>

- *Type:* string

The context key.

---

##### `tryRemoveChild` <a name="tryRemoveChild" id="constructs.Node.tryRemoveChild"></a>

```typescript
public tryRemoveChild(childName: string): boolean
```

Remove the child with the given name, if present.

###### `childName`<sup>Required</sup> <a name="childName" id="constructs.Node.tryRemoveChild.parameter.childName"></a>

- *Type:* string

---

##### `validate` <a name="validate" id="constructs.Node.validate"></a>

```typescript
public validate(): ValidationError[]
```

Validates tree (depth-first, pre-order) and returns the list of all errors.

An empty list indicates that there are no errors.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#constructs.Node.of">of</a></code> | Returns the node associated with a construct. |

---

##### `of` <a name="of" id="constructs.Node.of"></a>

```typescript
import { Node } from 'constructs'

Node.of(construct: IConstruct)
```

Returns the node associated with a construct.

###### `construct`<sup>Required</sup> <a name="construct" id="constructs.Node.of.parameter.construct"></a>

- *Type:* <a href="#constructs.IConstruct">IConstruct</a>

the construct.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#constructs.Node.property.addr">addr</a></code> | <code>string</code> | Returns an opaque tree-unique address for this construct. |
| <code><a href="#constructs.Node.property.children">children</a></code> | <code><a href="#constructs.IConstruct">IConstruct</a>[]</code> | All direct children of this construct. |
| <code><a href="#constructs.Node.property.dependencies">dependencies</a></code> | <code><a href="#constructs.Dependency">Dependency</a>[]</code> | Return all dependencies registered on this node or any of its children. |
| <code><a href="#constructs.Node.property.id">id</a></code> | <code>string</code> | The id of this construct within the current scope. |
| <code><a href="#constructs.Node.property.locked">locked</a></code> | <code>boolean</code> | Returns true if this construct or the scopes in which it is defined are locked. |
| <code><a href="#constructs.Node.property.metadata">metadata</a></code> | <code><a href="#constructs.MetadataEntry">MetadataEntry</a>[]</code> | An immutable array of metadata objects associated with this construct. |
| <code><a href="#constructs.Node.property.path">path</a></code> | <code>string</code> | The full, absolute path of this construct in the tree. |
| <code><a href="#constructs.Node.property.root">root</a></code> | <code><a href="#constructs.IConstruct">IConstruct</a></code> | Returns the root of the construct tree. |
| <code><a href="#constructs.Node.property.scopes">scopes</a></code> | <code><a href="#constructs.IConstruct">IConstruct</a>[]</code> | All parent scopes of this construct. |
| <code><a href="#constructs.Node.property.uniqueId">uniqueId</a></code> | <code>string</code> | A tree-global unique alphanumeric identifier for this construct. |
| <code><a href="#constructs.Node.property.scope">scope</a></code> | <code><a href="#constructs.IConstruct">IConstruct</a></code> | Returns the scope in which this construct is defined. |
| <code><a href="#constructs.Node.property.defaultChild">defaultChild</a></code> | <code><a href="#constructs.IConstruct">IConstruct</a></code> | Returns the child construct that has the id `Default` or `Resource"`. |

---

##### `addr`<sup>Required</sup> <a name="addr" id="constructs.Node.property.addr"></a>

```typescript
public readonly addr: string;
```

- *Type:* string

Returns an opaque tree-unique address for this construct.

Addresses are 42 characters hexadecimal strings. They begin with "c8"
followed by 40 lowercase hexadecimal characters (0-9a-f).

Addresses are calculated using a SHA-1 of the components of the construct
path.

To enable refactorings of construct trees, constructs with the ID `Default`
will be excluded from the calculation. In those cases constructs in the
same tree may have the same addreess.

---

*Example*

```typescript
c83a2846e506bcc5f10682b564084bca2d275709ee
```


##### `children`<sup>Required</sup> <a name="children" id="constructs.Node.property.children"></a>

```typescript
public readonly children: IConstruct[];
```

- *Type:* <a href="#constructs.IConstruct">IConstruct</a>[]

All direct children of this construct.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="constructs.Node.property.dependencies"></a>

```typescript
public readonly dependencies: Dependency[];
```

- *Type:* <a href="#constructs.Dependency">Dependency</a>[]

Return all dependencies registered on this node or any of its children.

---

##### `id`<sup>Required</sup> <a name="id" id="constructs.Node.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

The id of this construct within the current scope.

This is a a scope-unique id. To obtain an app-unique id for this construct, use `uniqueId`.

---

##### `locked`<sup>Required</sup> <a name="locked" id="constructs.Node.property.locked"></a>

```typescript
public readonly locked: boolean;
```

- *Type:* boolean

Returns true if this construct or the scopes in which it is defined are locked.

---

##### `metadata`<sup>Required</sup> <a name="metadata" id="constructs.Node.property.metadata"></a>

```typescript
public readonly metadata: MetadataEntry[];
```

- *Type:* <a href="#constructs.MetadataEntry">MetadataEntry</a>[]

An immutable array of metadata objects associated with this construct.

This can be used, for example, to implement support for deprecation notices, source mapping, etc.

---

##### `path`<sup>Required</sup> <a name="path" id="constructs.Node.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

The full, absolute path of this construct in the tree.

Components are separated by '/'.

---

##### `root`<sup>Required</sup> <a name="root" id="constructs.Node.property.root"></a>

```typescript
public readonly root: IConstruct;
```

- *Type:* <a href="#constructs.IConstruct">IConstruct</a>

Returns the root of the construct tree.

---

##### `scopes`<sup>Required</sup> <a name="scopes" id="constructs.Node.property.scopes"></a>

```typescript
public readonly scopes: IConstruct[];
```

- *Type:* <a href="#constructs.IConstruct">IConstruct</a>[]

All parent scopes of this construct.

---

##### ~~`uniqueId`~~<sup>Required</sup> <a name="uniqueId" id="constructs.Node.property.uniqueId"></a>

- *Deprecated:* please avoid using this property and use `addr` to form unique names.
This algorithm uses MD5, which is not FIPS-complient and also excludes the
identity of the root construct from the calculation.

```typescript
public readonly uniqueId: string;
```

- *Type:* string

A tree-global unique alphanumeric identifier for this construct.

Includes
all components of the tree.

---

##### `scope`<sup>Optional</sup> <a name="scope" id="constructs.Node.property.scope"></a>

```typescript
public readonly scope: IConstruct;
```

- *Type:* <a href="#constructs.IConstruct">IConstruct</a>

Returns the scope in which this construct is defined.

The value is `undefined` at the root of the construct scope tree.

---

##### `defaultChild`<sup>Optional</sup> <a name="defaultChild" id="constructs.Node.property.defaultChild"></a>

```typescript
public readonly defaultChild: IConstruct;
```

- *Type:* <a href="#constructs.IConstruct">IConstruct</a>

Returns the child construct that has the id `Default` or `Resource"`.

This is usually the construct that provides the bulk of the underlying functionality.
Useful for modifications of the underlying construct that are not available at the higher levels.
Override the defaultChild property.

This should only be used in the cases where the correct
default child is not named 'Resource' or 'Default' as it
should be.

If you set this to undefined, the default behavior of finding
the child named 'Resource' or 'Default' will be used.

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#constructs.Node.property.PATH_SEP">PATH_SEP</a></code> | <code>string</code> | Separator used to delimit construct path components. |

---

##### `PATH_SEP`<sup>Required</sup> <a name="PATH_SEP" id="constructs.Node.property.PATH_SEP"></a>

```typescript
public readonly PATH_SEP: string;
```

- *Type:* string

Separator used to delimit construct path components.

---

## Protocols <a name="Protocols" id="Protocols"></a>

### IAspect <a name="IAspect" id="constructs.IAspect"></a>

- *Implemented By:* <a href="#constructs.IAspect">IAspect</a>

Represents an Aspect.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#constructs.IAspect.visit">visit</a></code> | All aspects can visit an IConstruct. |

---

##### `visit` <a name="visit" id="constructs.IAspect.visit"></a>

```typescript
public visit(node: IConstruct): void
```

All aspects can visit an IConstruct.

###### `node`<sup>Required</sup> <a name="node" id="constructs.IAspect.visit.parameter.node"></a>

- *Type:* <a href="#constructs.IConstruct">IConstruct</a>

---


### IConstruct <a name="IConstruct" id="constructs.IConstruct"></a>

- *Implemented By:* <a href="#constructs.Construct">Construct</a>, cdklabs-projen-project-types.yarn.CdkLabsMonorepo, cdklabs-projen-project-types.yarn.Monorepo, cdklabs-projen-project-types.yarn.MonorepoRelease, cdklabs-projen-project-types.yarn.TypeScriptWorkspace, cdklabs-projen-project-types.yarn.WorkspaceRelease, cdklabs-projen-project-types.AutoMerge, cdklabs-projen-project-types.CdkConstructLibrary, cdklabs-projen-project-types.CdkJsiiProject, cdklabs-projen-project-types.CdkTypeScriptProject, cdklabs-projen-project-types.CdklabsConstructLibrary, cdklabs-projen-project-types.CdklabsJsiiProject, cdklabs-projen-project-types.CdklabsTypeScriptProject, cdklabs-projen-project-types.MergeQueue, cdklabs-projen-project-types.Rosetta, projen.awscdk.AutoDiscover, projen.awscdk.AwsCdkConstructLibrary, projen.awscdk.AwsCdkDeps, projen.awscdk.AwsCdkDepsJava, projen.awscdk.AwsCdkDepsJs, projen.awscdk.AwsCdkDepsPy, projen.awscdk.AwsCdkJavaApp, projen.awscdk.AwsCdkPythonApp, projen.awscdk.AwsCdkTypeScriptApp, projen.awscdk.CdkConfig, projen.awscdk.CdkTasks, projen.awscdk.ConstructLibraryAws, projen.awscdk.EdgeLambdaAutoDiscover, projen.awscdk.IntegrationTest, projen.awscdk.IntegrationTestAutoDiscover, projen.awscdk.LambdaAutoDiscover, projen.awscdk.LambdaExtension, projen.awscdk.LambdaExtensionAutoDiscover, projen.awscdk.LambdaFunction, projen.build.BuildWorkflow, projen.cdk.AutoDiscoverBase, projen.cdk.ConstructLibrary, projen.cdk.IntegrationTestAutoDiscoverBase, projen.cdk.IntegrationTestBase, projen.cdk.JsiiDocgen, projen.cdk.JsiiProject, projen.cdk8s.AutoDiscover, projen.cdk8s.Cdk8sDeps, projen.cdk8s.Cdk8sDepsPy, projen.cdk8s.Cdk8sPythonApp, projen.cdk8s.Cdk8sTypeScriptApp, projen.cdk8s.ConstructLibraryCdk8s, projen.cdk8s.IntegrationTest, projen.cdk8s.IntegrationTestAutoDiscover, projen.cdktf.ConstructLibraryCdktf, projen.circleci.Circleci, projen.github.AutoApprove, projen.github.AutoMerge, projen.github.AutoQueue, projen.github.Dependabot, projen.github.GitHub, projen.github.GitHubProject, projen.github.GithubWorkflow, projen.github.MergeQueue, projen.github.Mergify, projen.github.PullRequestBackport, projen.github.PullRequestLint, projen.github.PullRequestTemplate, projen.github.Stale, projen.github.TaskWorkflow, projen.github.TaskWorkflowJob, projen.gitlab.CiConfiguration, projen.gitlab.GitlabConfiguration, projen.gitlab.NestedConfiguration, projen.java.JavaProject, projen.java.Junit, projen.java.MavenCompile, projen.java.MavenPackaging, projen.java.MavenSample, projen.java.Pom, projen.java.Projenrc, projen.javascript.Bundler, projen.javascript.Eslint, projen.javascript.Jest, projen.javascript.LicenseChecker, projen.javascript.NodePackage, projen.javascript.NodeProject, projen.javascript.NpmConfig, projen.javascript.Prettier, projen.javascript.Projenrc, projen.javascript.TypescriptConfig, projen.javascript.UpgradeDependencies, projen.javascript.Yarnrc, projen.python.Pip, projen.python.Poetry, projen.python.PoetryPyproject, projen.python.Projenrc, projen.python.Pytest, projen.python.PytestSample, projen.python.PythonProject, projen.python.PythonSample, projen.python.RequirementsFile, projen.python.SetupPy, projen.python.Setuptools, projen.python.Venv, projen.release.Publisher, projen.release.Release, projen.typescript.Projenrc, projen.typescript.ProjenrcTs, projen.typescript.TypeScriptAppProject, projen.typescript.TypeScriptLibraryProject, projen.typescript.TypeScriptProject, projen.vscode.DevContainer, projen.vscode.VsCode, projen.vscode.VsCodeLaunchConfig, projen.vscode.VsCodeRecommendedExtensions, projen.vscode.VsCodeSettings, projen.web.NextComponent, projen.web.NextJsProject, projen.web.NextJsTypeScriptProject, projen.web.ReactComponent, projen.web.ReactProject, projen.web.ReactTypeDef, projen.web.ReactTypeScriptProject, projen.Component, projen.Dependencies, projen.DockerCompose, projen.FileBase, projen.GitAttributesFile, projen.Gitpod, projen.IgnoreFile, projen.IniFile, projen.JsonFile, projen.License, projen.Logger, projen.Makefile, projen.ObjectFile, projen.Project, projen.ProjectBuild, projen.ProjectTree, projen.Projenrc, projen.ProjenrcFile, projen.ProjenrcJson, projen.Renovatebot, projen.SampleDir, projen.SampleFile, projen.SampleReadme, projen.SourceCode, projen.Tasks, projen.TextFile, projen.TomlFile, projen.Version, projen.XmlFile, projen.YamlFile, <a href="#constructs.IConstruct">IConstruct</a>

Represents a construct.



### INodeFactory <a name="INodeFactory" id="constructs.INodeFactory"></a>

- *Implemented By:* <a href="#constructs.INodeFactory">INodeFactory</a>

A factory for attaching `Node`s to the construct.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#constructs.INodeFactory.createNode">createNode</a></code> | Returns a new `Node` associated with `host`. |

---

##### `createNode` <a name="createNode" id="constructs.INodeFactory.createNode"></a>

```typescript
public createNode(host: Construct, scope: IConstruct, id: string): Node
```

Returns a new `Node` associated with `host`.

###### `host`<sup>Required</sup> <a name="host" id="constructs.INodeFactory.createNode.parameter.host"></a>

- *Type:* <a href="#constructs.Construct">Construct</a>

the associated construct.

---

###### `scope`<sup>Required</sup> <a name="scope" id="constructs.INodeFactory.createNode.parameter.scope"></a>

- *Type:* <a href="#constructs.IConstruct">IConstruct</a>

the construct's scope (parent).

---

###### `id`<sup>Required</sup> <a name="id" id="constructs.INodeFactory.createNode.parameter.id"></a>

- *Type:* string

the construct id.

---


### ISynthesisSession <a name="ISynthesisSession" id="constructs.ISynthesisSession"></a>

- *Implemented By:* <a href="#constructs.ISynthesisSession">ISynthesisSession</a>

Represents a single session of synthesis.

Passed into `construct.onSynthesize()` methods.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#constructs.ISynthesisSession.property.outdir">outdir</a></code> | <code>string</code> | The output directory for this synthesis session. |

---

##### `outdir`<sup>Required</sup> <a name="outdir" id="constructs.ISynthesisSession.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string

The output directory for this synthesis session.

---

### IValidation <a name="IValidation" id="constructs.IValidation"></a>

- *Implemented By:* <a href="#constructs.IValidation">IValidation</a>

Implement this interface in order for the construct to be able to validate itself.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#constructs.IValidation.validate">validate</a></code> | Validate the current construct. |

---

##### `validate` <a name="validate" id="constructs.IValidation.validate"></a>

```typescript
public validate(): string[]
```

Validate the current construct.

This method can be implemented by derived constructs in order to perform
validation logic. It is called on all constructs before synthesis.


## Enums <a name="Enums" id="Enums"></a>

### ConstructOrder <a name="ConstructOrder" id="constructs.ConstructOrder"></a>

In what order to return constructs.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#constructs.ConstructOrder.PREORDER">PREORDER</a></code> | Depth-first, pre-order. |
| <code><a href="#constructs.ConstructOrder.POSTORDER">POSTORDER</a></code> | Depth-first, post-order (leaf nodes first). |

---

##### `PREORDER` <a name="PREORDER" id="constructs.ConstructOrder.PREORDER"></a>

Depth-first, pre-order.

---


##### `POSTORDER` <a name="POSTORDER" id="constructs.ConstructOrder.POSTORDER"></a>

Depth-first, post-order (leaf nodes first).

---

