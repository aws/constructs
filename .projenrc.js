const { cdk } = require('projen');

const project = new cdk.JsiiProject({
  name: 'constructs',
  description: 'A programming model for software-defined state',
  repository: 'https://github.com/aws/constructs.git',

  // release branches
  defaultReleaseBranch: '10.x',
  majorVersion: 10,
  npmDistTag: 'latest',
  releaseBranches: {
    '3.x': { majorVersion: 3, npmDistTag: 'latest-3' },
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
  minNodeVersion: '12.7.0',
  workflowNodeVersion: '12.22.0',

  compat: true,

  projenUpgradeSecret: 'PROJEN_GITHUB_TOKEN',
  autoApproveOptions: {
    allowedUsernames: ['aws-cdk-automation'],
    secret: 'GITHUB_TOKEN',
  },
  autoApproveUpgrades: true,
});

// disable go sumdb so that go deps are resolved directly against github
project.tasks.tryFind('package').prependExec('go env -w GOSUMDB=off');

project.synth();
