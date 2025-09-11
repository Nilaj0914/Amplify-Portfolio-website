import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as amplify from '@aws-cdk/aws-amplify-alpha';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';

export class WebsiteInfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Amplify APP
    const AmplifyApp = new amplify.App(this, 'PortfolioWebsite',{
      appName: 'PortfolioWebsite',

      // Connect github repo to amplify
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: 'Nilaj0914',
        repository: 'Amplify-Portfolio-website',
        oauthToken: cdk.SecretValue.secretsManager('github-token')
      }),

      // Build Specifications
      buildSpec: codebuild.BuildSpec.fromObjectToYaml({
        version: '1.0',
        frontend: {
          phases: {
            // Installing dependencies
            preBuild: {
              commands: [
                'echo "starting this build"',
                'cd website',
                'npm install'
              ],
            },

            // Building the Next.js app and exporting it as static files in the out directory
            build: {
              commands: [
                'echo "nuilding our next.js app"',
                'npm run buils-and-export',
                'echo "build completed"',
              ],
            },
          },

          // Telling amplify where the build output files are located that are to be hosted
          artifacts:{
            baseDirectory: 'website/out',
            files: ['**/*'],
          },

          // Caching node_modules and .next/cache to speed up build times in the future
          cache:{
            paths:[
              'node_modules/**/*',
              '.next/cache/**/*',
            ]
          }
        }
      })
    })

    // Automatically update website whenever changes are pushed to main branch of the repo
    const mainBranch = AmplifyApp.addBranch('main',{
      autoBuild: true,
      branchName: 'main',
    })
  }
}
