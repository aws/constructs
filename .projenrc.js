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

  publishToGo: {
    moduleName: 'github.com/aws/constructs-go',
  },

  stability: 'stable',

  minNodeVersion: '10.17.0',

  releaseBranches: ['master', '2.x'],
  compat: true,
  projenUpgradeSecret: 'PROJEN_GITHUB_TOKEN',
});

project.releaseWorkflow.addJobs({
  release_go: {
    'name': 'Release to Go',
    'needs': 'build',
    'runs-on': 'ubuntu-latest',
    'container': {
      image: 'jsii/superchain',
    },
    'steps': [
      {
        name: 'Download build artifacts',
        uses: 'actions/download-artifact@v1',
        with: {
          name: 'dist',
        },
      },
      {
        name: 'Release',
        run: 'npx -p jsii-release jsii-release-golang',
        env: {
          GITHUB_TOKEN: '${{ secrets.GO_GITHUB_TOKEN }}',
          GIT_USER_NAME: 'AWS CDK Team',
          GIT_USER_EMAIL: 'aws-cdk-dev@amazon.com',
        },
      },
    ],
  },
});

// temporary until https://github.com/aws/jsii/pull/2492 is resolved
project.packageTask.exec('./scripts/go-version-file.sh');

project.synth();
