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
  releaseBranches: {
    '3.x': { majorVersion: 3, npmDistTag: 'latest-3' },
  },
  devDeps: ['cdklabs-projen-project-types'],

  // author
  author: 'Amazon Web Services',
  authorAddress: 'aws-cdk-dev@amazon.com',
  homepage: 'https://github.com/aws/constructs',

  copyrightPeriod: `2018-${new Date().getFullYear()}`,
  copyrightOwner: 'Amazon.com, Inc. or its affiliates. All Rights Reserved.',

  keywords: [
    'aws',
    'constructs',
    'cdk',
    'jsii',
  ],

  publishToMaven: {
    javaPackage: 'software.constructs',
    mavenGroupId: 'software.constructs',
    mavenArtifactId: 'constructs',
    mavenStagingProfileId: 'CONSTRUCTS_MAVEN_STAGING_PROFILE_ID',
    mavenEndpoint: 'https://s01.oss.sonatype.org',
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
  minNodeVersion: '18.12.0',
  workflowNodeVersion: '18.x',

  compat: true,

  autoApproveOptions: {
    allowedUsernames: ['cdklabs-automation'],
    secret: 'GITHUB_TOKEN',
  },
  autoApproveUpgrades: true,

  jsiiVersion: '~5.2.0',
  typescriptVersion: '~5.2.0',
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

// Fix Jest 29 warning about deprecated config in `globals`
project.jest!.config.transform ??= {};
project.jest!.config.transform['\\.ts$'] = [
  'ts-jest',
  project.jest?.config.globals['ts-jest'],
];
delete project.jest!.config.globals['ts-jest'];

project.synth();
