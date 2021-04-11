import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";
export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // LAMBDA FUNCTIONS *********

    const helloLambda = new lambda.Function(this, "helloLambda", {
      code: lambda.Code.fromAsset("src/lambda-functions/hello-world"),
      handler: "index.helloWorld",
      runtime: lambda.Runtime.NODEJS_12_X,
      functionName:"helloWorld"
    });

    const helloLambda1 = new lambda.Function(this, "helloLambda1", {
      code: lambda.Code.fromAsset("src/lambda-functions/hello-world"),
      handler: "index.helloWorld",
      runtime: lambda.Runtime.NODEJS_12_X,
      functionName:"helloWorld1"
    });

    // API GATEWAY **********
    let api = new apigw.RestApi(this, "hello api",{
      restApiName:"example api"
    })

    // baseUrl/test to invoke helloLambda
    let item = api.root.addResource("test");
    let helloLambdaTrigger = new apigw.LambdaIntegration(helloLambda);
    item.addMethod("Get",helloLambdaTrigger)

    // baseUrl/test to invoke helloLambda1
    let item2 = api.root.addResource("test2");
    let api1 = new apigw.LambdaIntegration(helloLambda1)
    item2.addMethod("GET",api1)
    

  }
}
