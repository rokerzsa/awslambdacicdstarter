import { StackProps } from "aws-cdk-lib";
import { IBuildImage, LinuxLambdaBuildImage } from "aws-cdk-lib/aws-codebuild";
import { IManagedPolicy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Runtime } from "aws-cdk-lib/aws-lambda";

export type SynthStepCommands = {
  readonly commands: string[];
  readonly installCommands?: string[];
};

export enum SupportedLanguage {
  NodeJs = "nodejs",
  Python = "python",
  Java = "java",
  DotNet = "dotnet",
  Ruby = "ruby",
}

export type LambdaRuntimeIdentifier =
  | "nodejs22.x"
  | "nodejs20.x"
  | "nodejs18.x"
  | "python3.13"
  | "python3.12"
  | "python3.11"
  | "python3.10"
  | "python3.9"
  | "java21"
  | "java17"
  | "java11"
  | "java8.al2"
  | "dotnet8"
  | "ruby3.3"
  | "ruby3.2"
  | "provided.al2023"
  | "provided.al2";

export type LambdaRuntime = {
  runtime: Runtime;
  identifier: LambdaRuntimeIdentifier;
  language: SupportedLanguage;
  buildImage: IBuildImage;
};

export type SpecialPermissions = "ADMIN" | "LAMBDA_FULL" | "LAMBDA_DYNAMODB_STREAMS" | "LAMBDA_DYNAMODB_EXECUTION" | "DYNAMODB_FULL"  | "SQS_EXECUTION" | "SQS_FULL" | "CLOUDWATCH_FULL"

export type LambdaPolicyResponse = {
  managedPolicies: IManagedPolicy[]
  policyStatements: PolicyStatement[]
}

export type StackMetadataConfig = {
  projectName: string;
  repositoryName: string;
  branchName: string;
  lambdaName: string;
  lambdaRuntime: LambdaRuntimeIdentifier;
  lambdaHandlerName: string;
  lambdaAssetPath: string;
  lambdaTimeout?: number;
  lambdaMemory?: number;
  lambdaEnvironmentVariables?: {
    [key: string]: string;
  };
  lambdaAlias?: string;
  lambdaAliasDescription?: string;
  accountId:string;
  specialPermissions?: Set<SpecialPermissions>;
};

export type LambdaCiCdStackProps = {
  config: StackMetadataConfig;
} & StackProps;

export type LambdaApplicationStageProps = {
  config: StackMetadataConfig;
} & StackProps;
