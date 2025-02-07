import {
  SupportedLanguage,
  LambdaRuntime,
  LambdaRuntimeIdentifier,
  SynthStepCommands,
  SpecialPermissions,
  LambdaPolicyResponse,
} from "../types/lambda-cicd-types";
import { lambdaRuntimes } from "../constants/data";
import { IManagedPolicy, ManagedPolicy, PolicyStatement } from "aws-cdk-lib/aws-iam";

export const getRuntimeFromInfoFromName = (
  lambdaRuntime: LambdaRuntimeIdentifier
): LambdaRuntime => {
  const runtime = lambdaRuntimes.find(
    (runtime) => runtime.identifier === lambdaRuntime
  );
  if (runtime) return runtime;
  throw new Error(`Lambda runtime ${lambdaRuntime} not found`);
};

export const getSynthStepCommands = (
  lambdaRuntime: SupportedLanguage,
  props: SynthStepCommands
): SynthStepCommands => {
  switch (lambdaRuntime) {
    case SupportedLanguage.Python:
      return {
        commands: ["cdk synth"],
        installCommands: [
          "npm install -g aws-cdk",
          "npm install ci",
          ...(props?.installCommands ? props?.installCommands : []),
        ],
      };
    default:
      throw new Error(`Lambda runtime ${lambdaRuntime} not supported`);
  }
};

export const getLambdaExecutionRolePolicies = (permissions?: Set<SpecialPermissions>):LambdaPolicyResponse => {
  const managedPolicies: IManagedPolicy[] = [ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaBasicExecutionRole")];
  const policyStatements:PolicyStatement[] = [];
  permissions?.forEach((permission) => {
    switch (permission) {
      case "ADMIN":
        policyStatements.push(
          new PolicyStatement({
            actions: ["*"],
            resources: ["*"],
          })
        );
      case "LAMBDA_DYNAMODB_STREAMS":
        managedPolicies.push(
          ManagedPolicy.fromAwsManagedPolicyName(
            "AWSLambdaInvocation-DynamoDB"
          )
        );
        break;
      case "LAMBDA_DYNAMODB_EXECUTION":
        managedPolicies.push(
          ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaDynamoDBExecutionRole")
        );
      case "DYNAMODB_FULL":
        policyStatements.push(
          new PolicyStatement({
            actions: ["dynamodb:*"],
            resources: ["arn:aws:dynamodb:*:*:table/*"],
          })
        );
      case "CLOUDWATCH_FULL":
        policyStatements.push(
          new PolicyStatement({
            actions: ["cloudwatch:*"],
            resources: ["*"],
          })
        );
      case "SQS_EXECUTION":
          managedPolicies.push(
            ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaSQSQueueExecutionRole")
          );
      case "SQS_FULL":
        policyStatements.push(
          new PolicyStatement({
            actions: ["sqs:*"],
            resources: ["*"],
          })
        );
      case "LAMBDA_FULL":
        policyStatements.push(
          new PolicyStatement({
            actions: ["lambda:*"],
            resources: ["*"],
          })
        );
      default:
        console.log(`No such special permissions exists: ${permission}`);
    }
  });
  return {
    managedPolicies,
    policyStatements
  }
}
