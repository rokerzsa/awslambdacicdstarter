import {
  SupportedLanguage,
  LambdaRuntime,
  LambdaRuntimeIdentifier,
  SynthStepCommands,
} from "../types/lambda-cicd-types";
import { lambdaRuntimes } from "../constants/data";

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
