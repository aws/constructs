import { CdklabsJsiiProject } from 'cdklabs-projen-project-types';

const project = new CdklabsJsiiProject({
  name: 'constructs',
  projenrcTs: true,
  private: false,
  description: 'A programming model for software-defined state',
  repositoryUrl: 'https://github.com/aws/constructs.git',

  // release branches
  defaultReleaseBranch: '10.x',
  majorVersion: 10,
  npmDistTag: 'latest',
  devDeps: ['cdklabs-projen-project-types'],

  // author
  author: 'Amazon Web Services',
  authorAddress: 'aws-cdk-dev@amazon.com',
  homepage: 'https://github.com/aws/constructs',

  copyrightPeriod: `2018-${new Date().getFullYear()}`,
  copyrightOwner: 'Amazon.com, Inc. or its affiliates. All Rights Reserved.',

  keywords: ['aws', 'constructs', 'cdk', 'jsii'],

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

  jsiiVersion: '5.9.x',
  typescriptVersion: '5.9.x',
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

// cdklabs-projen-project-types is overzealous about adding this dependency
project.deps.removeDependency('constructs');

// modern type imports/exports
project.eslint?.addRules({
  '@typescript-eslint/consistent-type-exports': 'error',
  '@typescript-eslint/consistent-type-imports': 'error',
});

project.synth();
