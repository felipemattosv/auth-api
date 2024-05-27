import { Serverless } from 'serverless/aws';

import { baseRoutes } from 'src/routes/base';
import { authRoutes } from 'src/routes/auth';

const serverlessConfiguration: Serverless = {
  service: 'aws-serverless-template',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', "serverless-offline", 'serverless-dotenv-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: {
    authenticate: {
      handler: 'src/utils/auth.authenticate',
    },
    ...baseRoutes,
    ...authRoutes,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
