const { JsiiProject, Semver } = require('projen');

const project = new JsiiProject({
  name: 'constructs',
  description: 'A programming model for composable configuration',
  repository: 'https://github.com/aws/constructs.git',
  authorName: 'Amazon Web Services',
  authorEmail: 'benisrae@amazon.com',
  homepage: 'https://github.com/aws/constructs',

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

  stability: 'stable',

  minNodeVersion: '10.17.0',

});

// check API compatibility against latest published major version
project.addCompileCommand('yarn compat');
project.manifest.author = {
  name: 'Amazon Web Services',
  url: 'https://aws.amazon.com',
  organization: true
};

project.synth();
