# Constructs Programming Model

> Define composable configuration models through code

![Release](https://github.com/awslabs/constructs/workflows/Release/badge.svg)
[![npm version](https://badge.fury.io/js/constructs.svg)](https://badge.fury.io/js/constructs)
[![PyPI version](https://badge.fury.io/py/constructs.svg)](https://badge.fury.io/py/constructs)
[![NuGet version](https://badge.fury.io/nu/Constructs.svg)](https://badge.fury.io/nu/Constructs)
[![Maven Central](https://maven-badges.herokuapp.com/maven-central/software.constructs/constructs/badge.svg?style=plastic)](https://maven-badges.herokuapp.com/maven-central/software.constructs/constructs)

## User Manual

### Scope Relocation

The path of a scope is used as a seed for all names generated within that scope
such as logical names in the AWS CDK or `node.uniqueId`.

There are use cases in which an entire construct subtree (scope) needs to be
"relocated" to a different path. The main use case is in order to allow
refactoring while preserving old names.

> Be careful: relocating a scope may result in duplicate names. Use at your own
> risk.

To relocate a scope, use the `node.relocate(root)` method. This method can only
be called before any children are added to the scope and it will impact the
value of `node.path` and `node.uniqueId`.

> If implementing name generation, make sure to refer to `node.path` as the root
> of the scope's path instead of `node.scopes`.

Let's say we had a scope `foo` that was originally under the `foo` path and it
has a child called `childOfFoo`:

```ts
const foo = new Construct(root, 'foo');
const childOfFoo = new Construct(foo, 'childOfFoo');
expect(Node.of(foo).path).toBe('foo');
expect(Node.of(childOfFoo).path).toBe('foo/childOfFoo');
```

Now, we want to refactor our code and hoist it under a new root, say `baz`:

```ts
const baz = new Construct(root, 'baz');
const foo = new Construct(baz, 'foo');
const childOfFoo = new Construct(foo, 'childOfFoo');

// now the paths (andu uniqudIds) are different
expect(Node.of(foo).path).toBe('bar/foo');
expect(Node.of(childOfFoo).path).toBe('baz/foo/childOfFoo');
```

If we relocate `foo` to `foo`, the original paths are preserved:

```ts
const baz = new Construct(root, 'baz');
const foo = new Construct(baz, 'foo');
Node.of(construct).relocate('foo'); // must be done before adding children

const childOfFoo = new Construct(foo, 'childOfFoo');

// now the paths (andu uniqudIds) are different
expect(Node.of(foo).path).toBe('foo');
expect(Node.of(childOfFoo).path).toBe('foo/childOfFoo');
```

Similarly, the `uniqueId` of a construct will be derived from this path.

## Contributing

This project has adopted the [Amazon Open Source Code of
Conduct](https://aws.github.io/code-of-conduct).

We welcome community contributions and pull requests. See our [contribution
guide](./CONTRIBUTING.md) for more information on how to report issues, set up a
development environment and submit code.

## License

This project is distributed under the [Apache License, Version 2.0](./LICENSE).
