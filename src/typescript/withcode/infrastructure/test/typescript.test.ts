import * as cdk from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import * as Typescript from '../lib/lambda-pipeline-stack';

test('Lambda application is deployed', () => {
  // const app = new cdk.App();
  // // WHEN
  // const stack = new Typescript.TypescriptStack(app, 'MyTestStack');
  // // THEN

  // const template = Template.fromStack(stack);

  // template.hasResourceProperties('AWS::SQS::Queue', {
  //   VisibilityTimeout: 300
  // });
  // template.resourceCountIs('AWS::SNS::Topic', 1);
});
