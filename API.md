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

new Construct(scope: Construct, id: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#constructs.Construct.Initializer.parameter.scope">scope</a></code> | <code><a href="#constructs.Construct">Construct</a></code> | The scope in which to define this construct. |
| <code><a href="#constructs.Construct.Initializer.parameter.id">id</a></code> | <code>string</code> | The scoped construct ID. |

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

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#constructs.Construct.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="constructs.Construct.isConstruct"></a>

```typescript
import { Construct } from 'constructs'

Construct.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="constructs.Construct.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#constructs.Construct.property.node">node</a></code> | <code><a href="#constructs.Node">Node</a></code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="constructs.Construct.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* <a href="#constructs.Node">Node</a>

The tree node.

---


### RootConstruct <a name="RootConstruct" id="constructs.RootConstruct"></a>

Creates a new root construct node.

The root construct represents the top of the construct tree and is not contained within a parent scope itself.
For root constructs, the id is optional.

#### Initializers <a name="Initializers" id="constructs.RootConstruct.Initializer"></a>

```typescript
import { RootConstruct } from 'constructs'

new RootConstruct(id?: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#constructs.RootConstruct.Initializer.parameter.id">id</a></code> | <code>string</code> | The scoped construct ID. |

---

##### `id`<sup>Optional</sup> <a name="id" id="constructs.RootConstruct.Initializer.parameter.id"></a>

- *Type:* string

The scoped construct ID.

Must be unique amongst siblings. If
the ID includes a path separator (`/`), then it will be replaced by double
dash `--`.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#constructs.RootConstruct.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="constructs.RootConstruct.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#constructs.RootConstruct.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="constructs.RootConstruct.isConstruct"></a>

```typescript
import { RootConstruct } from 'constructs'

RootConstruct.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="constructs.RootConstruct.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#constructs.RootConstruct.property.node">node</a></code> | <code><a href="#constructs.Node">Node</a></code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="constructs.RootConstruct.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* <a href="#constructs.Node">Node</a>

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

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
| <code><a href="#constructs.MetadataEntry.property.trace">trace</a></code> | <code>string[]</code> | Stack trace at the point of adding the metadata. |

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

Stack trace at the point of adding the metadata.

Only available if `addMetadata()` is called with `stackTrace: true`.

---

### MetadataOptions <a name="MetadataOptions" id="constructs.MetadataOptions"></a>

Options for `construct.addMetadata()`.

#### Initializer <a name="Initializer" id="constructs.MetadataOptions.Initializer"></a>

```typescript
import { MetadataOptions } from 'constructs'

const metadataOptions: MetadataOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#constructs.MetadataOptions.property.stackTrace">stackTrace</a></code> | <code>boolean</code> | Include stack trace with metadata entry. |
| <code><a href="#constructs.MetadataOptions.property.traceFromFunction">traceFromFunction</a></code> | <code>any</code> | A JavaScript function to begin tracing from. |

---

##### `stackTrace`<sup>Optional</sup> <a name="stackTrace" id="constructs.MetadataOptions.property.stackTrace"></a>

```typescript
public readonly stackTrace: boolean;
```

- *Type:* boolean
- *Default:* false

Include stack trace with metadata entry.

---

##### `traceFromFunction`<sup>Optional</sup> <a name="traceFromFunction" id="constructs.MetadataOptions.property.traceFromFunction"></a>

```typescript
public readonly traceFromFunction: any;
```

- *Type:* any
- *Default:* addMetadata()

A JavaScript function to begin tracing from.

This option is ignored unless `stackTrace` is `true`.

---

## Classes <a name="Classes" id="Classes"></a>

### Dependable <a name="Dependable" id="constructs.Dependable"></a>

Trait for IDependable.

Traits are interfaces that are privately implemented by objects. Instead of
showing up in the public interface of a class, they need to be queried
explicitly. This is used to implement certain framework features that are
not intended to be used by Construct consumers, and so should be hidden
from accidental use.

*Example*

```typescript
// Usage
const roots = Dependable.of(construct).dependencyRoots;

// Definition
Dependable.implement(construct, {
      dependencyRoots: [construct],
});
```


#### Initializers <a name="Initializers" id="constructs.Dependable.Initializer"></a>

```typescript
import { Dependable } from 'constructs'

new Dependable()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#constructs.Dependable.get">get</a></code> | Return the matching Dependable for the given class instance. |
| <code><a href="#constructs.Dependable.implement">implement</a></code> | Turn any object into an IDependable. |
| <code><a href="#constructs.Dependable.of">of</a></code> | Return the matching Dependable for the given class instance. |

---

##### ~~`get`~~ <a name="get" id="constructs.Dependable.get"></a>

```typescript
import { Dependable } from 'constructs'

Dependable.get(instance: IDependable)
```

Return the matching Dependable for the given class instance.

###### `instance`<sup>Required</sup> <a name="instance" id="constructs.Dependable.get.parameter.instance"></a>

- *Type:* <a href="#constructs.IDependable">IDependable</a>

---

##### `implement` <a name="implement" id="constructs.Dependable.implement"></a>

```typescript
import { Dependable } from 'constructs'

Dependable.implement(instance: IDependable, trait: Dependable)
```

Turn any object into an IDependable.

###### `instance`<sup>Required</sup> <a name="instance" id="constructs.Dependable.implement.parameter.instance"></a>

- *Type:* <a href="#constructs.IDependable">IDependable</a>

---

###### `trait`<sup>Required</sup> <a name="trait" id="constructs.Dependable.implement.parameter.trait"></a>

- *Type:* <a href="#constructs.Dependable">Dependable</a>

---

##### `of` <a name="of" id="constructs.Dependable.of"></a>

```typescript
import { Dependable } from 'constructs'

Dependable.of(instance: IDependable)
```

Return the matching Dependable for the given class instance.

###### `instance`<sup>Required</sup> <a name="instance" id="constructs.Dependable.of.parameter.instance"></a>

- *Type:* <a href="#constructs.IDependable">IDependable</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#constructs.Dependable.property.dependencyRoots">dependencyRoots</a></code> | <code><a href="#constructs.IConstruct">IConstruct</a>[]</code> | The set of constructs that form the root of this dependable. |

---

##### `dependencyRoots`<sup>Required</sup> <a name="dependencyRoots" id="constructs.Dependable.property.dependencyRoots"></a>

```typescript
public readonly dependencyRoots: IConstruct[];
```

- *Type:* <a href="#constructs.IConstruct">IConstruct</a>[]

The set of constructs that form the root of this dependable.

All resources under all returned constructs are included in the ordering
dependency.

---


### DependencyGroup <a name="DependencyGroup" id="constructs.DependencyGroup"></a>

- *Implements:* <a href="#constructs.IDependable">IDependable</a>

A set of constructs to be used as a dependable.

This class can be used when a set of constructs which are disjoint in the
construct tree needs to be combined to be used as a single dependable.

#### Initializers <a name="Initializers" id="constructs.DependencyGroup.Initializer"></a>

```typescript
import { DependencyGroup } from 'constructs'

new DependencyGroup(deps: ...IDependable[])
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#constructs.DependencyGroup.Initializer.parameter.deps">deps</a></code> | <code>...<a href="#constructs.IDependable">IDependable</a>[]</code> | *No description.* |

---

##### `deps`<sup>Required</sup> <a name="deps" id="constructs.DependencyGroup.Initializer.parameter.deps"></a>

- *Type:* ...<a href="#constructs.IDependable">IDependable</a>[]

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#constructs.DependencyGroup.add">add</a></code> | Add a construct to the dependency roots. |

---

##### `add` <a name="add" id="constructs.DependencyGroup.add"></a>

```typescript
public add(scopes: ...IDependable[]): void
```

Add a construct to the dependency roots.

###### `scopes`<sup>Required</sup> <a name="scopes" id="constructs.DependencyGroup.add.parameter.scopes"></a>

- *Type:* ...<a href="#constructs.IDependable">IDependable</a>[]

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
| <code><a href="#constructs.Node.addDependency">addDependency</a></code> | Add an ordering dependency on another construct. |
| <code><a href="#constructs.Node.addMetadata">addMetadata</a></code> | Adds a metadata entry to this construct. |
| <code><a href="#constructs.Node.addValidation">addValidation</a></code> | Adds a validation to this construct. |
| <code><a href="#constructs.Node.findAll">findAll</a></code> | Return this construct and all of its children in the given order. |
| <code><a href="#constructs.Node.findChild">findChild</a></code> | Return a direct child by id. |
| <code><a href="#constructs.Node.getAllContext">getAllContext</a></code> | Retrieves the all context of a node from tree context. |
| <code><a href="#constructs.Node.getContext">getContext</a></code> | Retrieves a value from tree context if present. Otherwise, would throw an error. |
| <code><a href="#constructs.Node.lock">lock</a></code> | Locks this construct from allowing more children to be added. |
| <code><a href="#constructs.Node.setContext">setContext</a></code> | This can be used to set contextual values. |
| <code><a href="#constructs.Node.tryFindChild">tryFindChild</a></code> | Return a direct child by id, or undefined. |
| <code><a href="#constructs.Node.tryGetContext">tryGetContext</a></code> | Retrieves a value from tree context. |
| <code><a href="#constructs.Node.tryRemoveChild">tryRemoveChild</a></code> | Remove the child with the given name, if present. |
| <code><a href="#constructs.Node.validate">validate</a></code> | Validates this construct. |

---

##### `addDependency` <a name="addDependency" id="constructs.Node.addDependency"></a>

```typescript
public addDependency(deps: ...IDependable[]): void
```

Add an ordering dependency on another construct.

An `IDependable`

###### `deps`<sup>Required</sup> <a name="deps" id="constructs.Node.addDependency.parameter.deps"></a>

- *Type:* ...<a href="#constructs.IDependable">IDependable</a>[]

---

##### `addMetadata` <a name="addMetadata" id="constructs.Node.addMetadata"></a>

```typescript
public addMetadata(type: string, data: any, options?: MetadataOptions): void
```

Adds a metadata entry to this construct.

Entries are arbitrary values and will also include a stack trace to allow tracing back to
the code location for when the entry was added. It can be used, for example, to include source
mapping in CloudFormation templates to improve diagnostics.
Note that construct metadata is not the same as CloudFormation resource metadata and is never written to the CloudFormation template.
The metadata entries are written to the Cloud Assembly Manifest if the `treeMetadata` property is specified in the props of the App that contains this Construct.

###### `type`<sup>Required</sup> <a name="type" id="constructs.Node.addMetadata.parameter.type"></a>

- *Type:* string

a string denoting the type of metadata.

---

###### `data`<sup>Required</sup> <a name="data" id="constructs.Node.addMetadata.parameter.data"></a>

- *Type:* any

the value of the metadata (can be a Token).

If null/undefined, metadata will not be added.

---

###### `options`<sup>Optional</sup> <a name="options" id="constructs.Node.addMetadata.parameter.options"></a>

- *Type:* <a href="#constructs.MetadataOptions">MetadataOptions</a>

options.

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

The validation object.

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

##### `getAllContext` <a name="getAllContext" id="constructs.Node.getAllContext"></a>

```typescript
public getAllContext(defaults?: object): any
```

Retrieves the all context of a node from tree context.

Context is usually initialized at the root, but can be overridden at any point in the tree.

###### `defaults`<sup>Optional</sup> <a name="defaults" id="constructs.Node.getAllContext.parameter.defaults"></a>

- *Type:* object

Any keys to override the retrieved context.

---

##### `getContext` <a name="getContext" id="constructs.Node.getContext"></a>

```typescript
public getContext(key: string): any
```

Retrieves a value from tree context if present. Otherwise, would throw an error.

Context is usually initialized at the root, but can be overridden at any point in the tree.

###### `key`<sup>Required</sup> <a name="key" id="constructs.Node.getContext.parameter.key"></a>

- *Type:* string

The context key.

---

##### `lock` <a name="lock" id="constructs.Node.lock"></a>

```typescript
public lock(): void
```

Locks this construct from allowing more children to be added.

After this
call, no more children can be added to this construct or to any children.

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
public validate(): string[]
```

Validates this construct.

Invokes the `validate()` method on all validations added through
`addValidation()`.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#constructs.Node.of">of</a></code> | Returns the node associated with a construct. |

---

##### ~~`of`~~ <a name="of" id="constructs.Node.of"></a>

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
| <code><a href="#constructs.Node.property.dependencies">dependencies</a></code> | <code><a href="#constructs.IConstruct">IConstruct</a>[]</code> | Return all dependencies registered on this node (non-recursive). |
| <code><a href="#constructs.Node.property.id">id</a></code> | <code>string</code> | The id of this construct within the current scope. |
| <code><a href="#constructs.Node.property.locked">locked</a></code> | <code>boolean</code> | Returns true if this construct or the scopes in which it is defined are locked. |
| <code><a href="#constructs.Node.property.metadata">metadata</a></code> | <code><a href="#constructs.MetadataEntry">MetadataEntry</a>[]</code> | An immutable array of metadata objects associated with this construct. |
| <code><a href="#constructs.Node.property.path">path</a></code> | <code>string</code> | The full, absolute path of this construct in the tree. |
| <code><a href="#constructs.Node.property.root">root</a></code> | <code><a href="#constructs.IConstruct">IConstruct</a></code> | Returns the root of the construct tree. |
| <code><a href="#constructs.Node.property.scopes">scopes</a></code> | <code><a href="#constructs.IConstruct">IConstruct</a>[]</code> | All parent scopes of this construct. |
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

To enable refactoring of construct trees, constructs with the ID `Default`
will be excluded from the calculation. In those cases constructs in the
same tree may have the same address.

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
public readonly dependencies: IConstruct[];
```

- *Type:* <a href="#constructs.IConstruct">IConstruct</a>[]

Return all dependencies registered on this node (non-recursive).

---

##### `id`<sup>Required</sup> <a name="id" id="constructs.Node.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

The id of this construct within the current scope.

This is a scope-unique id. To obtain an app-unique id for this construct, use `addr`.

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

### IConstruct <a name="IConstruct" id="constructs.IConstruct"></a>

- *Extends:* <a href="#constructs.IDependable">IDependable</a>

- *Implemented By:* <a href="#constructs.Construct">Construct</a>, <a href="#constructs.RootConstruct">RootConstruct</a>, cdklabs-projen-project-types.yarn.CdkLabsMonorepo, cdklabs-projen-project-types.yarn.Monorepo, cdklabs-projen-project-types.yarn.MonorepoRelease, cdklabs-projen-project-types.yarn.TypeScriptWorkspace, cdklabs-projen-project-types.yarn.WorkspaceRelease, cdklabs-projen-project-types.AutoMerge, cdklabs-projen-project-types.CdkConstructLibrary, cdklabs-projen-project-types.CdkJsiiProject, cdklabs-projen-project-types.CdkTypeScriptProject, cdklabs-projen-project-types.CdklabsConstructLibrary, cdklabs-projen-project-types.CdklabsJsiiProject, cdklabs-projen-project-types.CdklabsTypeScriptProject, cdklabs-projen-project-types.MergeQueue, cdklabs-projen-project-types.Rosetta, projen.awscdk.AutoDiscover, projen.awscdk.AwsCdkConstructLibrary, projen.awscdk.AwsCdkDeps, projen.awscdk.AwsCdkDepsJava, projen.awscdk.AwsCdkDepsJs, projen.awscdk.AwsCdkDepsPy, projen.awscdk.AwsCdkJavaApp, projen.awscdk.AwsCdkPythonApp, projen.awscdk.AwsCdkTypeScriptApp, projen.awscdk.CdkConfig, projen.awscdk.CdkTasks, projen.awscdk.ConstructLibraryAws, projen.awscdk.EdgeLambdaAutoDiscover, projen.awscdk.IntegrationTest, projen.awscdk.IntegrationTestAutoDiscover, projen.awscdk.LambdaAutoDiscover, projen.awscdk.LambdaExtension, projen.awscdk.LambdaExtensionAutoDiscover, projen.awscdk.LambdaFunction, projen.build.BuildWorkflow, projen.cdk.AutoDiscoverBase, projen.cdk.ConstructLibrary, projen.cdk.IntegrationTestAutoDiscoverBase, projen.cdk.IntegrationTestBase, projen.cdk.JsiiDocgen, projen.cdk.JsiiProject, projen.cdk8s.AutoDiscover, projen.cdk8s.Cdk8sDeps, projen.cdk8s.Cdk8sDepsPy, projen.cdk8s.Cdk8sPythonApp, projen.cdk8s.Cdk8sTypeScriptApp, projen.cdk8s.ConstructLibraryCdk8s, projen.cdk8s.IntegrationTest, projen.cdk8s.IntegrationTestAutoDiscover, projen.cdktf.ConstructLibraryCdktf, projen.circleci.Circleci, projen.github.AutoApprove, projen.github.AutoMerge, projen.github.Dependabot, projen.github.GitHub, projen.github.GitHubProject, projen.github.GithubWorkflow, projen.github.Mergify, projen.github.PullRequestBackport, projen.github.PullRequestLint, projen.github.PullRequestTemplate, projen.github.Stale, projen.github.TaskWorkflow, projen.github.TaskWorkflowJob, projen.gitlab.CiConfiguration, projen.gitlab.GitlabConfiguration, projen.gitlab.NestedConfiguration, projen.java.JavaProject, projen.java.Junit, projen.java.MavenCompile, projen.java.MavenPackaging, projen.java.MavenSample, projen.java.Pom, projen.java.Projenrc, projen.javascript.Bundler, projen.javascript.Eslint, projen.javascript.Jest, projen.javascript.LicenseChecker, projen.javascript.NodePackage, projen.javascript.NodeProject, projen.javascript.NpmConfig, projen.javascript.Prettier, projen.javascript.Projenrc, projen.javascript.TypescriptConfig, projen.javascript.UpgradeDependencies, projen.javascript.Yarnrc, projen.python.Pip, projen.python.Poetry, projen.python.PoetryPyproject, projen.python.Projenrc, projen.python.Pytest, projen.python.PytestSample, projen.python.PythonProject, projen.python.PythonSample, projen.python.RequirementsFile, projen.python.SetupPy, projen.python.Setuptools, projen.python.Venv, projen.release.Publisher, projen.release.Release, projen.typescript.Projenrc, projen.typescript.ProjenrcTs, projen.typescript.TypeScriptAppProject, projen.typescript.TypeScriptLibraryProject, projen.typescript.TypeScriptProject, projen.vscode.DevContainer, projen.vscode.VsCode, projen.vscode.VsCodeLaunchConfig, projen.vscode.VsCodeRecommendedExtensions, projen.vscode.VsCodeSettings, projen.web.NextComponent, projen.web.NextJsProject, projen.web.NextJsTypeScriptProject, projen.web.ReactComponent, projen.web.ReactProject, projen.web.ReactTypeDef, projen.web.ReactTypeScriptProject, projen.Component, projen.Dependencies, projen.DockerCompose, projen.FileBase, projen.GitAttributesFile, projen.Gitpod, projen.IgnoreFile, projen.IniFile, projen.JsonFile, projen.License, projen.Logger, projen.Makefile, projen.ObjectFile, projen.Project, projen.ProjectBuild, projen.ProjectTree, projen.Projenrc, projen.ProjenrcFile, projen.ProjenrcJson, projen.Renovatebot, projen.SampleDir, projen.SampleFile, projen.SampleReadme, projen.SourceCode, projen.Tasks, projen.TextFile, projen.TomlFile, projen.Version, projen.XmlFile, projen.YamlFile, <a href="#constructs.IConstruct">IConstruct</a>

Represents a construct.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#constructs.IConstruct.property.node">node</a></code> | <code><a href="#constructs.Node">Node</a></code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="constructs.IConstruct.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* <a href="#constructs.Node">Node</a>

The tree node.

---

### IDependable <a name="IDependable" id="constructs.IDependable"></a>

- *Implemented By:* <a href="#constructs.Construct">Construct</a>, <a href="#constructs.DependencyGroup">DependencyGroup</a>, <a href="#constructs.RootConstruct">RootConstruct</a>, cdklabs-projen-project-types.yarn.CdkLabsMonorepo, cdklabs-projen-project-types.yarn.Monorepo, cdklabs-projen-project-types.yarn.MonorepoRelease, cdklabs-projen-project-types.yarn.TypeScriptWorkspace, cdklabs-projen-project-types.yarn.WorkspaceRelease, cdklabs-projen-project-types.AutoMerge, cdklabs-projen-project-types.CdkConstructLibrary, cdklabs-projen-project-types.CdkJsiiProject, cdklabs-projen-project-types.CdkTypeScriptProject, cdklabs-projen-project-types.CdklabsConstructLibrary, cdklabs-projen-project-types.CdklabsJsiiProject, cdklabs-projen-project-types.CdklabsTypeScriptProject, cdklabs-projen-project-types.MergeQueue, cdklabs-projen-project-types.Rosetta, projen.awscdk.AutoDiscover, projen.awscdk.AwsCdkConstructLibrary, projen.awscdk.AwsCdkDeps, projen.awscdk.AwsCdkDepsJava, projen.awscdk.AwsCdkDepsJs, projen.awscdk.AwsCdkDepsPy, projen.awscdk.AwsCdkJavaApp, projen.awscdk.AwsCdkPythonApp, projen.awscdk.AwsCdkTypeScriptApp, projen.awscdk.CdkConfig, projen.awscdk.CdkTasks, projen.awscdk.ConstructLibraryAws, projen.awscdk.EdgeLambdaAutoDiscover, projen.awscdk.IntegrationTest, projen.awscdk.IntegrationTestAutoDiscover, projen.awscdk.LambdaAutoDiscover, projen.awscdk.LambdaExtension, projen.awscdk.LambdaExtensionAutoDiscover, projen.awscdk.LambdaFunction, projen.build.BuildWorkflow, projen.cdk.AutoDiscoverBase, projen.cdk.ConstructLibrary, projen.cdk.IntegrationTestAutoDiscoverBase, projen.cdk.IntegrationTestBase, projen.cdk.JsiiDocgen, projen.cdk.JsiiProject, projen.cdk8s.AutoDiscover, projen.cdk8s.Cdk8sDeps, projen.cdk8s.Cdk8sDepsPy, projen.cdk8s.Cdk8sPythonApp, projen.cdk8s.Cdk8sTypeScriptApp, projen.cdk8s.ConstructLibraryCdk8s, projen.cdk8s.IntegrationTest, projen.cdk8s.IntegrationTestAutoDiscover, projen.cdktf.ConstructLibraryCdktf, projen.circleci.Circleci, projen.github.AutoApprove, projen.github.AutoMerge, projen.github.Dependabot, projen.github.GitHub, projen.github.GitHubProject, projen.github.GithubWorkflow, projen.github.Mergify, projen.github.PullRequestBackport, projen.github.PullRequestLint, projen.github.PullRequestTemplate, projen.github.Stale, projen.github.TaskWorkflow, projen.github.TaskWorkflowJob, projen.gitlab.CiConfiguration, projen.gitlab.GitlabConfiguration, projen.gitlab.NestedConfiguration, projen.java.JavaProject, projen.java.Junit, projen.java.MavenCompile, projen.java.MavenPackaging, projen.java.MavenSample, projen.java.Pom, projen.java.Projenrc, projen.javascript.Bundler, projen.javascript.Eslint, projen.javascript.Jest, projen.javascript.LicenseChecker, projen.javascript.NodePackage, projen.javascript.NodeProject, projen.javascript.NpmConfig, projen.javascript.Prettier, projen.javascript.Projenrc, projen.javascript.TypescriptConfig, projen.javascript.UpgradeDependencies, projen.javascript.Yarnrc, projen.python.Pip, projen.python.Poetry, projen.python.PoetryPyproject, projen.python.Projenrc, projen.python.Pytest, projen.python.PytestSample, projen.python.PythonProject, projen.python.PythonSample, projen.python.RequirementsFile, projen.python.SetupPy, projen.python.Setuptools, projen.python.Venv, projen.release.Publisher, projen.release.Release, projen.typescript.Projenrc, projen.typescript.ProjenrcTs, projen.typescript.TypeScriptAppProject, projen.typescript.TypeScriptLibraryProject, projen.typescript.TypeScriptProject, projen.vscode.DevContainer, projen.vscode.VsCode, projen.vscode.VsCodeLaunchConfig, projen.vscode.VsCodeRecommendedExtensions, projen.vscode.VsCodeSettings, projen.web.NextComponent, projen.web.NextJsProject, projen.web.NextJsTypeScriptProject, projen.web.ReactComponent, projen.web.ReactProject, projen.web.ReactTypeDef, projen.web.ReactTypeScriptProject, projen.Component, projen.Dependencies, projen.DockerCompose, projen.FileBase, projen.GitAttributesFile, projen.Gitpod, projen.IgnoreFile, projen.IniFile, projen.JsonFile, projen.License, projen.Logger, projen.Makefile, projen.ObjectFile, projen.Project, projen.ProjectBuild, projen.ProjectTree, projen.Projenrc, projen.ProjenrcFile, projen.ProjenrcJson, projen.Renovatebot, projen.SampleDir, projen.SampleFile, projen.SampleReadme, projen.SourceCode, projen.Tasks, projen.TextFile, projen.TomlFile, projen.Version, projen.XmlFile, projen.YamlFile, <a href="#constructs.IConstruct">IConstruct</a>, <a href="#constructs.IDependable">IDependable</a>

Trait marker for classes that can be depended upon.

The presence of this interface indicates that an object has
an `IDependable` implementation.

This interface can be used to take an (ordering) dependency on a set of
constructs. An ordering dependency implies that the resources represented by
those constructs are deployed before the resources depending ON them are
deployed.



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

