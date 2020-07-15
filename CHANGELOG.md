# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [4.1.1-pre.5](https://github.com/aws/constructs/compare/v4.1.1-pre.4...v4.1.1-pre.5) (2020-07-15)


### Features

* node.relocate() ([d5e4420](https://github.com/aws/constructs/commit/d5e4420cded68012af47a1ea6c9d09842c88ecd3))

### [4.1.1-pre.4](https://github.com/aws/constructs/compare/v4.1.1-pre.3...v4.1.1-pre.4) (2020-07-13)


### Features

* construct.node.addValidation() ([51b629f](https://github.com/aws/constructs/commit/51b629fe78dd1772ef135ccebe10f8d659cdba18))

### [4.1.1-pre.3](https://github.com/aws/constructs/compare/v4.1.1-pre.2...v4.1.1-pre.3) (2020-07-12)


### Features

* support composite dependables via DependencyGroup ([d8cffc0](https://github.com/aws/constructs/commit/d8cffc0de0d55f67fdbc88e2885fd110928426a5))

### [4.1.1-pre.2](https://github.com/aws/constructs/compare/v4.1.1-pre.0...v4.1.1-pre.2) (2020-07-12)


### Features

* allow empty construct names ([03668f9](https://github.com/aws/constructs/commit/03668f9ef15cdcb8ddd9de606045d1fc4ced1a4e))
* construct scope settings ([1d842c2](https://github.com/aws/constructs/commit/1d842c24952896c335fcdd7550a136e8af5f75c4))
* Construct.isConstruct(x) ([7e1055b](https://github.com/aws/constructs/commit/7e1055bee09a291724fd1f85e413891dae9745aa))


### Bug Fixes

* backwards compatibility of `Dependency` ([9ebe17a](https://github.com/aws/constructs/commit/9ebe17a88a2a0e38331bc3eff5d772dbb8e9e6db))

### [4.1.1-pre.1](https://github.com/aws/constructs/compare/v4.1.1-pre.0...v4.1.1-pre.1) (2020-07-09)


### Features

* construct scope settings ([1d842c2](https://github.com/aws/constructs/commit/1d842c24952896c335fcdd7550a136e8af5f75c4))


### Bug Fixes

* backwards compatibility of `Dependency` ([9ebe17a](https://github.com/aws/constructs/commit/9ebe17a88a2a0e38331bc3eff5d772dbb8e9e6db))

### [4.1.1-pre.0](https://github.com/aws/constructs/compare/v4.1.0...v4.1.1-pre.0) (2020-07-06)


### ⚠ BREAKING CHANGES

* Stack traces are not attached to metadata entries by default. To include stack trace in a metadata entry, pass `{ stackTrace: true }` as the 3rd parameter, which is now of type `MetadataOptions` and not a `fromFunction` pointer.
* `construct.node.dependencies` is not transitive anymore. It returns the set of dependencies added directly to the node. The `Dependency` type has also been removed as a result since it's not needed any longer.

### Features

* addMetadata() no longer attaches stack traces by default ([2bedd90](https://github.com/aws/constructs/commit/2bedd907f39b64715cade2d49e94a9978930bc56))
* IDependable ([d11bd33](https://github.com/aws/constructs/commit/d11bd339aed3cad000d07fdd8ef7d2741153935a))
* traceFromFunction in addMetadata() ([46652b0](https://github.com/aws/constructs/commit/46652b04d81e5a0031be5a5f48fe713ce47a8765))

## [4.1.0](https://github.com/aws/constructs/compare/v4.0.0...v4.1.0) (2020-07-06)


### ⚠ BREAKING CHANGES

* to add validation logic for constructs, implement the `IValidation` interface. 
* The `construct.node.validate()` method no longer validates the entire tree, but only the specific construct on which it is called.
* constructs no longer have an `onPrepare()` and `onSynthesis()` hooks. See domain-specific (such as AWS CDK and cdk8s) for alternatives.
* aspects are no longer supported as part of the constructs library, so `node.applyAspect()` is no longer available. The AWS CDK implements aspects through `Aspects.of(construct).apply()`.

### Features

* aspect are no longer supported ([ffe8cf6](https://github.com/aws/constructs/commit/ffe8cf6c4dbcb67b25d874028c09a04ed68e264c))
* introduce IValidation instead of onValidate() ([c99d198](https://github.com/aws/constructs/commit/c99d198bca8698c19e88cd53fb8393fb4ec50bed))
* remove onPrepare() and onSynthesize() ([a312b34](https://github.com/aws/constructs/commit/a312b3455227ba25853eece6a3a588d67a3edb4c))

## [4.0.0](https://github.com/aws/constructs/compare/v3.0.4...v4.0.0) (2020-07-05)


### ⚠ BREAKING CHANGES

* `Node.of(construct)` was replaced with `construct.node`.

### Features

* construct.node ([6e4b278](https://github.com/aws/constructs/commit/6e4b2783764ec4155f858b22751804ffe7587f5a))

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
