const { JsiiProject, Semver } = require('projen');

const project = new JsiiProject({
  name: 'constructs',
  description: 'A programming model for composable configuration',
  repository: 'https://github.com/aws/constructs.git',

  // release branches
  defaultReleaseBranch: 'main',
  majorVersion: 3,
  releaseBranches: {
    '10.x': { majorVersion: 10 },
  },

  // author
  authorName: 'Amazon Web Services',
  authorUrl: 'https://aws.amazon.com',
  authorOrganization: true,
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

  minNodeVersion: '10.17.0',

  compat: true,
  projenUpgradeSecret: 'PROJEN_GITHUB_TOKEN',
});

// disable go sumdb so that go deps are resolved directly against github
project.tasks.tryFind('package').prependExec('go env -w GOSUMDB=off');

project.synth();
