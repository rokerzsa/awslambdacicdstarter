import { Runtime } from "aws-cdk-lib/aws-lambda";
import { LambdaRuntime, SupportedLanguage } from "../types/lambda-cicd-types";
import { LinuxArmBuildImage, LinuxArmLambdaBuildImage, LinuxBuildImage, LinuxLambdaBuildImage, MacBuildImage } from "aws-cdk-lib/aws-codebuild";

export const lambdaRuntimes: LambdaRuntime[] = [
  {
    runtime: Runtime.NODEJS_22_X,
    identifier: "nodejs22.x",
    buildImage: LinuxArmBuildImage.AMAZON_LINUX_2023_STANDARD_3_0,
    language: SupportedLanguage.Python,
  },
  {
    runtime: Runtime.NODEJS_20_X,
    identifier: "nodejs20.x",
    buildImage: LinuxArmBuildImage.AMAZON_LINUX_2023_STANDARD_3_0,
    language: SupportedLanguage.Python,
  },
  {
    runtime: Runtime.PYTHON_3_13,
    identifier: "python3.13",
    buildImage: LinuxArmBuildImage.AMAZON_LINUX_2023_STANDARD_3_0,
    language: SupportedLanguage.Python,
  },
  {
    runtime: Runtime.PYTHON_3_12,
    identifier: "python3.12",
    buildImage: LinuxArmBuildImage.AMAZON_LINUX_2023_STANDARD_3_0,
    language: SupportedLanguage.Python,
  },
  {
    runtime: Runtime.PYTHON_3_11,
    identifier: "python3.11",
    buildImage: LinuxArmBuildImage.AMAZON_LINUX_2_STANDARD_3_0,
    language: SupportedLanguage.Python,
  },
  {
    runtime: Runtime.PYTHON_3_10,
    identifier: "python3.10",
    buildImage: LinuxArmBuildImage.AMAZON_LINUX_2_STANDARD_3_0,
    language: SupportedLanguage.Python,
  },
  {
    runtime: Runtime.PYTHON_3_9,
    identifier: "python3.9",
    buildImage: LinuxArmBuildImage.AMAZON_LINUX_2_STANDARD_3_0,
    language: SupportedLanguage.Python,
  },
  {
    runtime: Runtime.JAVA_21,
    identifier: "java21",
    buildImage: LinuxArmBuildImage.AMAZON_LINUX_2023_STANDARD_3_0,
    language: SupportedLanguage.Java,
  },
  {
    runtime: Runtime.JAVA_17,
    identifier: "java17",
    buildImage: LinuxArmBuildImage.AMAZON_LINUX_2_STANDARD_3_0,
    language: SupportedLanguage.Java,
  },
  {
    runtime: Runtime.JAVA_11,
    identifier: "java11",
    buildImage: LinuxArmBuildImage.AMAZON_LINUX_2_STANDARD_3_0,
    language: SupportedLanguage.Java,
  },
  {
    runtime: Runtime.DOTNET_8,
    identifier: "dotnet8",
    buildImage: LinuxArmBuildImage.AMAZON_LINUX_2023_STANDARD_3_0,
    language: SupportedLanguage.DotNet,
  },
  {
    runtime: Runtime.RUBY_3_3,
    identifier: "ruby3.3",
    buildImage: LinuxArmBuildImage.AMAZON_LINUX_2_STANDARD_3_0,
    language: SupportedLanguage.Ruby,
  },
  {
    runtime: Runtime.RUBY_3_2,
    identifier: "ruby3.2",
    buildImage: LinuxArmBuildImage.AMAZON_LINUX_2_STANDARD_3_0,
    language: SupportedLanguage.Ruby,
  }
];