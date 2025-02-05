import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaApplicationStageProps } from "../types/lambda-cicd-types";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { getRuntimeFromInfoFromName } from "../utils/common-utils";
import { ApiGateway } from "aws-cdk-lib/aws-events-targets";

export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, stageName:string, props: LambdaApplicationStageProps) {
    super(scope, id, props);
    const runtimeInfo = getRuntimeFromInfoFromName(props.config.lambdaRuntime);
    const lambda = new Function(this, "LambdaFunction", {
        runtime: runtimeInfo.runtime,
        handler: props.config.lambdaHandlerName,
        code: Code.fromAsset(props.config.lambdaAssetPath),
        timeout: props.config.lambdaTimeout ? Duration.seconds(props.config.lambdaTimeout) : undefined,
        memorySize: props.config.lambdaMemory,
        environment: {
            stageName: stageName
        },
        description: props.config.lambdaAliasDescription
    })
  }
}
    
