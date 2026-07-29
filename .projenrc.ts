import { CdklabsJsiiProject } from 'cdklabs-projen-project-types';
import { javascript, typescript } from 'projen';

const project = new CdklabsJsiiProject({
  name: 'constructs',
  projenrcTs: true,
  private: false,
  description: 'A programming model for software-defined state',
  repositoryUrl: 'https://github.com/aws/constructs.git',

  // author
  author: 'Amazon Web Services',
  authorAddress: 'aws-cdk-dev@amazon.com',
  homepage: 'https://github.com/aws/constructs',
  copyrightPeriod: `2018-${new Date().getFullYear()}`,
  copyrightOwner: 'Amazon.com, Inc. or its affiliates. All Rights Reserved.',
  keywords: ['aws', 'constructs', 'cdk', 'jsii'],

  // repo
  packageManager: javascript.NodePackageManager.YARN_BERRY,
  yarnBerryOptions: {
    yarnRcOptions: {
      // projen peer-depends on a released `constructs`; Yarn Berry would satisfy
      // that with this workspace itself (0.0.0, uncompiled). Declared here, not
      // in package.json, because jsii-pacmak rejects a self-named dependency.
      enableTransparentWorkspaces: false,
      packageExtensions: {
        'constructs@*': {
          dependencies: {
            constructs: '^10.5.0',
          },
        },
      },
    },
  },
  runner: typescript.TypeScriptRunner.tsx(),
  devDeps: ['cdklabs-projen-project-types'],

  // release branches
  defaultReleaseBranch: '10.x',
  majorVersion: 10,
  npmDistTag: 'latest',

  publishToMaven: {
    javaPackage: 'software.constructs',
    mavenGroupId: 'software.constructs',
    mavenArtifactId: 'constructs',
    mavenStagingProfileId: 'CONSTRUCTS_MAVEN_STAGING_PROFILE_ID',
    mavenServerId: 'central-ossrh',
  },

  publishToPypi: {
    distName: 'constructs',
    module: 'constructs',
  },

  publishToNuget: {
    dotNetNamespace: 'Constructs',
    packageId: 'Constructs',
  },

  publishToGo: {
    moduleName: 'github.com/aws/constructs-go',
    gitUserName: 'AWS CDK Team',
    gitUserEmail: 'aws-cdk-dev@amazon.com',
  },

  stability: 'stable',
  setNodeEngineVersion: false,
  compat: true,

  enablePRAutoMerge: true,
  autoApproveOptions: {
    allowedUsernames: ['cdklabs-automation'],
    secret: 'GITHUB_TOKEN',
  },
  autoApproveUpgrades: true,

  tsconfig: {
    compilerOptions: {
      types: ['jest', 'node'],
    },
  },

  jsiiVersion: '6.0.x',
  typescriptVersion: '6.0.x',
});

// disable go sumdb so that go deps are resolved directly against github
project.tasks.tryFind('package')?.prependExec('go env -w GOSUMDB=off');

// Also check that our dependency closure is installable using NPM, not just yarn
// (Not just additional steps, make it separate job)
project.buildWorkflow?.addPostBuildJobCommands(
  'installable_with_npm',
  ['npm --version && npm install'],
  { checkoutRepo: true },
);

project.npmignore?.exclude('/scripts/', '.projenrc.ts');

// cdklabs-projen-project-types adds this, but a package listing its own name
// breaks jsii-pacmak. It's declared via packageExtensions above instead.
project.deps.removeDependency('constructs');

// modern type imports/exports
project.eslint?.addRules({
  '@typescript-eslint/consistent-type-exports': 'error',
  '@typescript-eslint/consistent-type-imports': 'error',
});

project.synth();
