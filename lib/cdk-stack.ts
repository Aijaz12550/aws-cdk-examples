import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // LAMBDA FUNCTIONS *********

    const helloLambda = new lambda.Function(this, "helloLambda", {
      code: lambda.Code.fromAsset("src/lambda-functions/hello-world"),
      handler: "index.helloWorld",
      runtime: lambda.Runtime.NODEJS_12_X,
    });
  }
}
