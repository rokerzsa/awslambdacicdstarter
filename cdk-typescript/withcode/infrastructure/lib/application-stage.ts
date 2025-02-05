import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaStack } from "./lambda-stack";
import { LambdaApplicationStageProps } from "../types/lambda-cicd-types";

export class ApplicationStage extends Stage {
  constructor(scope: Construct, id: string, stageName:string, props: LambdaApplicationStageProps) {
    super(scope, id, props);
    const application = new LambdaStack(this, "LambdaStack", stageName, {
      ...props,
    })
  }
}
    
