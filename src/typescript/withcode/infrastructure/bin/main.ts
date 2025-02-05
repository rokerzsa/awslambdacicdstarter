#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { LambdaCiCdStack } from "../lib/lambda-pipeline-stack";
import { StackMetadataConfig } from "../types/lambda-cicd-types";

const config: StackMetadataConfig =
  require("../config/config.json") as StackMetadataConfig;

const app = new cdk.App();

new LambdaCiCdStack(app, "LambdaCiCdStack", {
  config: config,
  env: {
    account: config.accountId,
    region: "us-east-1",
  },
});
