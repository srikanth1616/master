import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // dynamodb table
    const globalTable = new dynamodb.Table(this, 'Table', {
  partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
  replicationRegions: ['us-east-1', 'us-east-2', 'us-west-2'],
  billingMode: dynamodb.BillingMode.PROVISIONED,
});

globalTable.autoScaleWriteCapacity({
  minCapacity: 1,
  maxCapacity: 10,
}).scaleOnUtilization({ targetUtilizationPercent: 75 });
    // example resource
    // const queue = new sqs.Queue(this, 'InfraQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
