const { JsiiProject, Semver } = require('projen');

const project = new JsiiProject({
  name: 'constructs',
  description: 'A programming model for composable configuration',
  repository: 'https://github.com/aws/constructs.git',

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

  stability: 'stable',

  minNodeVersion: '10.17.0',

  releaseBranches: ['master', '2.x'],
  compat: true,
  projenUpgradeSecret: 'PROJEN_GITHUB_TOKEN',
});

project.tryFindObjectFile('package.json').addOverride('jsii.targets.go', {
  moduleName: 'github.com/aws/constructs-go',
});

project.synth();
