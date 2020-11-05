const { JsiiProject } = require('projen');

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
    "aws",
    "constructs",
    "cdk",
    "jsii"
  ],

  java: {
    javaPackage: 'software.constructs',
    mavenGroupId: 'software.constructs',
    mavenArtifactId: 'constructs'
  },

  python: {
    distName: 'constructs',
    module: 'constructs'
  },

  dotnet: {
    dotNetNamespace: 'Constructs',
    packageId: 'Constructs'
  },

  stability: 'experimental',
  minNodeVersion: '10.17.0',

  releaseBranches: [ 'master', '2.x', '10.x' ],
  compat: true,

  //----------------------------------------------------
  // pre-release 10.x: publish "next" dist-tag and do not publish non-npm languages
  //----------------------------------------------------------
  npmDistTag: 'next',

  projenUpgradeSecret: 'PROJEN_GITHUB_TOKEN',
});

project.addScripts({
  bump: 'standard-version -r patch -p pre',
  release: 'yarn bump && git push --follow-tags origin 10.x' 
});

project.synth();
