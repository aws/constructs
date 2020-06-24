# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
