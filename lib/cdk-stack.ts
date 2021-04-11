import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";
export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // lambda layers **********

    const node_modules_layer = new lambda.LayerVersion(this, "dependencies",{
      code: lambda.Code.fromAsset("src/lambda-layers/packages"),
      compatibleRuntimes: [lambda.Runtime.NODEJS_12_X]
    })


    const authLayer = new lambda.LayerVersion(this,"authLayer",{
      code: lambda.Code.fromAsset("src/lambda-layers/auth"),
      compatibleRuntimes: [lambda.Runtime.NODEJS_12_X]
    })

    // LAMBDA FUNCTIONS *********
    const helloLambda = new lambda.Function(this, "helloLambda", {
      code: lambda.Code.fromAsset("src/lambda-functions/hello-world"),
      handler: "index.helloWorld",
      runtime: lambda.Runtime.NODEJS_12_X,
      functionName:"helloWorld",
      layers:[node_modules_layer,authLayer]
    });


    // api gateway

    new apigw.LambdaRestApi(this,"layerapi",{
      handler:helloLambda
    })
    




    
  }
}
