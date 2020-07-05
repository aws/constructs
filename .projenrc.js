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

  stability: 'stable',
  minNodeVersion: '10.3.0',

  //----------------------------------------------------
  // pre-release 4.x: publish "next" dist-tag and do not publish non-npm languages
  //----------------------------------------------------------
  npmDistTag: 'next',

  // java: {
  //   javaPackage: 'software.constructs',
  //   mavenGroupId: 'software.constructs',
  //   mavenArtifactId: 'constructs'
  // },

  // python: {
  //   distName: 'constructs',
  //   module: 'constructs'
  // },

  // dotnet: {
  //   dotNetNamespace: 'Constructs',
  //   packageId: 'Constructs'
  // },
});

project.addScripts({
  compat: `npx jsii-diff npm:$(node -p "require(\'./package.json\').name") -k --ignore-file .compatignore || (echo "\nUNEXPECTED BREAKING CHANGES\nAdd keys (e.g. 'removed:constructs.Node.of') to .compatignore in order to skip\n" && exit 1)`
});

// check API compatibility against latest published major version
project.addCompileCommand('yarn compat');
project.manifest.author = {
  name: 'Amazon Web Services',
  url: 'https://aws.amazon.com',
  organization: true
};

project.synth();
