import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaApplicationStageProps } from "../types/lambda-cicd-types";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import {
  getLambdaExecutionRolePolicies,
  getRuntimeFromInfoFromName,
} from "../utils/common-utils";
import { ApiGateway } from "aws-cdk-lib/aws-events-targets";
import {
  IManagedPolicy,
  ManagedPolicy,
  PolicyStatement,
  Role,
  RoleProps,
  ServicePrincipal,
} from "aws-cdk-lib/aws-iam";
import { config } from "process";

export class LambdaStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    stageName: string,
    props: LambdaApplicationStageProps
  ) {
    super(scope, id, props);
    const lambdaFunctionName = `${props.config.projectName}-${stageName}`;
    const runtimeInfo = getRuntimeFromInfoFromName(props.config.lambdaRuntime);
    const policyResponse = getLambdaExecutionRolePolicies(
      props.config.specialPermissions
    );
    const lambdaExecutionRole = new Role(this, "LambdaExecutionRole", {
      assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
      path: "/",
      roleName: `${lambdaFunctionName}LambdaExecutionRole`,
      managedPolicies: policyResponse.managedPolicies,
    });
    policyResponse.policyStatements.forEach((policyStatement) =>
      lambdaExecutionRole.addToPolicy(policyStatement)
    );
    const lambda = new Function(this, "LambdaFunction", {
      functionName: lambdaFunctionName,
      runtime: runtimeInfo.runtime,
      handler: props.config.lambdaHandlerName,
      code: Code.fromAsset(props.config.lambdaAssetPath),
      timeout: props.config.lambdaTimeout
        ? Duration.seconds(props.config.lambdaTimeout)
        : undefined,
      memorySize: props.config.lambdaMemory,
      environment: {
        stageName: stageName,
      },
      description: props.config.lambdaAliasDescription,
      role: lambdaExecutionRole,
    });
  }
}
