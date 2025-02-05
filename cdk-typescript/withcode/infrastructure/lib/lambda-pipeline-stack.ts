import { pipelines, Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  LambdaCiCdStackProps,
  LambdaRuntime,
} from "../types/lambda-cicd-types";
import { Repository } from "aws-cdk-lib/aws-codecommit";
import { CodePipeline } from "aws-cdk-lib/pipelines";
import {
  getRuntimeFromInfoFromName,
  getSynthStepCommands,
} from "../utils/common-utils";
import { ApplicationStage } from "./application-stage";

export class LambdaCiCdStack extends Stack {
  constructor(scope: Construct, id: string, props: LambdaCiCdStackProps) {
    super(scope, id, props);
    const runtimeInfo: LambdaRuntime = getRuntimeFromInfoFromName(
      props.config.lambdaRuntime
    );
    const { config } = props;
    const repository = Repository.fromRepositoryName(
      this,
      "CodeCommitRepository",
      config.repositoryName
    );
    const pipeline = new CodePipeline(this, "CodePipeline", {
      pipelineName: `${config.projectName}-${config.branchName}-pipeline`,
      selfMutation: true,
      synth: new pipelines.CodeBuildStep("SynthStep", {
        input: pipelines.CodePipelineSource.codeCommit(
          repository,
          config.branchName
        ),
        ...getSynthStepCommands(runtimeInfo.language, { commands: [] }),
        buildEnvironment: {
          buildImage: runtimeInfo.buildImage,
          environmentVariables: {
            CDK_DEFAULT_ACCOUNT: {
              value: process.env.CDK_DEFAULT_ACCOUNT,
            },
            CDK_DEFAULT_REGION: {
              value: process.env.CDK_DEFAULT_REGION,
            },
          },
        },
      }),
    });
    pipeline.addStage(
      new ApplicationStage(this, "TestApplicationStage", "test", { config })
    );
    pipeline.addStage(
      new ApplicationStage(this, "ProdApplicationStage", "prod", { config }),
      {
        pre: [
          new pipelines.ManualApprovalStep("ManualApprovalStep", {
            comment: "Approve to continue deployment",
          }),
        ],
      }
    );
  }
}
