const { JsiiProject } = require('projen');

const project = new JsiiProject({
  name: 'constructs',
  description: 'A programming model for software-defined state',
  repository: 'https://github.com/aws/constructs.git',
  defaultReleaseBranch: 'master', // will move to "main" shortly

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

  releaseBranches: ['master', '2.x', '10.x'],
  compat: true,

  //----------------------------------------------------
  // pre-release 10.x: publish "next" dist-tag and do not publish non-npm languages
  //----------------------------------------------------------
  npmDistTag: 'next',

  projenUpgradeSecret: 'PROJEN_GITHUB_TOKEN',
});

// disable go sumdb so that go deps are resolved directly against github
project.tasks.tryFind('package').prependExec('go env -w GOSUMDB=off');

project.synth();
