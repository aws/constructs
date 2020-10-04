# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 10.0

### Use `construct.node` instead of `Node.of(construct)`

* The `Node.of(construct)` API is no longer supported. To access the construct
  node, use `construct.node` instead.
* The option to customize the node factory is no longer supported and therefore
  the initializer of `Construct` now only accepts two arguments (scope and ID),
  and the `ConstructOptions` and `INodeFactory` types have been removed.

### Aspects no longer supported

Aspects are not part of the "constructs" library. The `IAspect` type and
`node.applyAspect` methods have been removed. The AWS CDK still supports aspects
through the `Aspects.of(construct).add(aspect)` API.

### `onPrepare()` is no longer supported

The `onPrepare()` hook and the `Node.prepare(node)` method are no longer
supported as this hook can be abused and cause construct tree corruption when
the tree is mutated during this stage. An error will be thrown if `onPrepare()`
is implemented on a construct.

### `onSynthesize()` hook is no longer supported

The `onSynthesize()` hook and the `Node.synthesize(node)` method is no longer
supported. Synthesis is now implemented at the domain-specific app level (e.g.
AWS CDK `App`). The `ISynthesisSession` and  `SynthesisOptions` types have been
removed. An error will be thrown if `onSynthesize()` is implemented on a
construct.

### Validation is now added using `node.addValidation()` instead of `onValidate()`

To add validation logic to a construct, use `node.addValidation()` instead of
overriding a protected `onValidate()` method. An error will be thrown if
`onValidate()` is implemented.

The static method `Node.validate(node)` is no longer available. The method
`node.validate()` only validates the _current_ node and returns the list of all
error messages returned by calling `validation.validate()` on all validations
added to this node.

### Logging API is not longer available

The `construct.node.addInfo()`, `construct.node.addWarning()` and
`construct.node.Error()` methods have been removed and have been moved to
domain-specific APIs. For example, in the AWS CDK, you can use the
`Annotations.of(x).addWarning()` method. The `ConstructMetadata` type has also
been removed.

### Dependencies

* The `node.dependencies` method now returns only dependencies associated with
  the current node (previously it returned all dependencies within the scope,
  recursively). The return type is now a simple array of `IConstruct`, and the
  `Dependency` type has been removed.
* To implement `IDependable`, use `Dependable.implement()`.
* The `DependencyGroup` class represents a mutable composition of `IDependable`
  objects and can be used to combine a disjoined set of constructs into a single
  dependency list.

### Misc

* `Construct.isConstruct(x)` is no longer supported. Use `x instanceof Construct` instead.
* For performance reasons, `node.addMetadata()` no longer attaches stack traces
  by default. Use `{stackTraces: true }` to opt-in.

### [3.0.4](https://github.com/aws/constructs/compare/v3.0.3...v3.0.4) (2020-06-24)

### [3.0.3](https://github.com/aws/constructs/compare/v1.1.4...v3.0.3) (2020-05-04)


### ⚠ BREAKING CHANGES

* The `Token` class as well as all related elements
(`IResolvable`, etc...) were removed from this release. The feature may
be re-introduced in the future, but was pulled due to causing conflicts
with overlapping implementations in some consumers.

* add facility to validate construct ids

* Updated version number to 3.0.0

* PR feedback

* Removed Construct ID validator

* Update package.json

Co-authored-by: mergify[bot] <37929162+mergify[bot]@users.noreply.github.com>
Co-authored-by: Elad Ben-Israel <benisrae@amazon.com>
* upgrading jsii runtime version in constructs requires
modules to update to the same jsii version to prevent version conflicts
in all non typescript/javascript language targets.

### Features

* remove Token/IResolvable API ([#34](https://github.com/aws/constructs/issues/34)) ([8f2b556](https://github.com/aws/constructs/commit/8f2b556db79f2823542afe210ee40bea57f29bea))


### Bug Fixes

* constructs created by an Aspect are not prepared ([#23](https://github.com/aws/constructs/issues/23)) ([aa18192](https://github.com/aws/constructs/commit/aa181929a1ca5d72350ee621ca69827113772a80))
* cryptic error message in Node.of() ([#17](https://github.com/aws/constructs/issues/17)) ([7db507b](https://github.com/aws/constructs/commit/7db507ba9ad3af1fc5ed956f12d5b10a4d8bada5)), closes [#16](https://github.com/aws/constructs/issues/16) [aws/aws-cdk#6885](https://github.com/aws/aws-cdk/issues/6885)
* used a typeguard function instead of 'instanceof', that breaks when using npm link as multiple 'construct' libraries could exists in node_modules [#32](https://github.com/aws/constructs/issues/32) ([#33](https://github.com/aws/constructs/issues/33)) ([166ba7e](https://github.com/aws/constructs/commit/166ba7ef9e88fd9ffbedd6fa2e6d096ace370ca4))


* upgrade jsii to v1.1.0 ([#14](https://github.com/aws/constructs/issues/14)) ([e4157f1](https://github.com/aws/constructs/commit/e4157f109c3e1d05fe5d24c4bd9ce100b5c56b51))

### [3.0.2](https://github.com/aws/constructs/compare/v3.0.1...v3.0.2) (2020-04-21)

* upgrade jsii and jsii-pacmak to v1.1.1 ([#14](https://github.com/aws/constructs/issues/14)) ([e4157f1](https://github.com/aws/constructs/commit/e4157f109c3e1d05fe5d24c4bd9ce100b5c56b51))


### [3.0.1](https://github.com/aws/constructs/compare/v1.1.4...v3.0.1) (2020-04-14)

### ⚠ BREAKING CHANGES

* The `Token` class as well as all related elements (`IResolvable`, etc...) were removed from this release. The feature may be re-introduced in the future, but was pulled due to causing conflicts with overlapping implementations in some consumers.

### Features

* remove Token/IResolvable API ([#34](https://github.com/aws/constructs/issues/34)) ([8f2b556](https://github.com/aws/constructs/commit/8f2b556db79f2823542afe210ee40bea57f29bea))
* upgrade jsii to v1.1.0 ([#14](https://github.com/aws/constructs/issues/14)) ([e4157f1](https://github.com/aws/constructs/commit/e4157f109c3e1d05fe5d24c4bd9ce100b5c56b51))

### Bug Fixes

* constructs will not be prepared due to instanceof issue [#32](https://github.com/aws/constructs/issues/32) ([#33](https://github.com/aws/constructs/issues/33)) ([166ba7e](https://github.com/aws/constructs/commit/166ba7ef9e88fd9ffbedd6fa2e6d096ace370ca4))


## [2.0.1](https://github.com/aws/constructs/compare/v1.1.4...v2.0.1) (2020-04-01)

### Bug Fixes

* constructs created by an Aspect are not prepared ([#23](https://github.com/aws/constructs/issues/23)) ([aa18192](https://github.com/aws/constructs/commit/aa181929a1ca5d72350ee621ca69827113772a80))
* cryptic error message in Node.of() ([#17](https://github.com/aws/constructs/issues/17)) ([7db507b](https://github.com/aws/constructs/commit/7db507ba9ad3af1fc5ed956f12d5b10a4d8bada5)), closes [#16](https://github.com/aws/constructs/issues/16) [aws/aws-cdk#6885](https://github.com/aws/aws-cdk/issues/6885)

## [2.0.0](https://github.com/aws/constructs/compare/v1.1.4...v2.0.0) (2020-03-19)


### ⚠ BREAKING CHANGES

* upgrading jsii runtime version in constructs requires
modules to update to the same jsii version to prevent version conflicts
in all non typescript/javascript language targets.

* upgrade jsii to v1.1.0 ([#14](https://github.com/aws/constructs/issues/14)) ([e4157f1](https://github.com/aws/constructs/commit/e4157f109c3e1d05fe5d24c4bd9ce100b5c56b51))

### [1.1.5](https://github.com/aws/constructs/compare/v1.1.4...v1.1.5) (2020-03-19)

This patch release reverts the dependency on jsii 1.x introduced in 1.1.4, which was a breaking change.

### [1.1.4](https://github.com/aws/constructs/compare/v1.1.3...v1.1.4) (2020-03-19)

### [1.1.3](https://github.com/aws/constructs/compare/v1.1.2...v1.1.3) (2020-03-19)

### [1.1.2](https://github.com/aws/constructs/compare/v1.1.1...v1.1.2) (2020-03-12)

### [1.1.1](https://github.com/aws/constructs/compare/v1.1.0...v1.1.1) (2020-03-12)

## [1.1.0](https://github.com/aws/constructs/compare/v0.0.2...v1.1.0) (2020-03-12)


### Features

* improve API names and organization around nodes ([#2](https://github.com/aws/constructs/issues/2)) ([68b406d](https://github.com/aws/constructs/commit/68b406dff77cd60ed80a5cd541d6607fa470d2c5))

## [1.0.0](https://github.com/aws/constructs/compare/v0.0.2...v1.0.0) (2020-03-11)

Initial release.
