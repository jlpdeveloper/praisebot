const { DynamoDBClient, PutItemCommand, QueryCommand, ScanCommand  } = require("@aws-sdk/client-dynamodb");
const { DateTime } = require("luxon");
let dynamo = {}

let client = new DynamoDBClient({ region: 'us-east-1' });

dynamo.addShoutout = async (user, createdBy, recognitionmessage) => {
  try {
   var now = DateTime.now().setZone('America/New_York');
    var item = {
      TableName: 'Praisebot',
      Item: {
        userId: { S: user.id },
        createdOn: { N: now.toUnixInteger().toString() },
        weekStart: {N: now.startOf('week').toUnixInteger().toString()},
        message: { S: recognitionmessage },
        recipientName: { S: user.name },
        createdBy: { S: createdBy.username },
        createdByUserId: { S: createdBy.id }
      }
    };
    const command = new PutItemCommand(item);
 
    const response = await client.send(command);
  }
  catch (ex) {
    console.log(ex);
    throw ex;
  }

}

dynamo.getShoutoutsSince = async (since) => {
  
  const params = {
    KeyConditionExpression: "weekStart = :s",
    IndexName: 'WeeklyIndex',
    ExpressionAttributeValues: {
      ":s": { N: since.toString() },
     
    },
    
    TableName: "Praisebot",
  };
  const data = await client.send(new QueryCommand(params));
  return data.Items;
}

dynamo.getShoutoutsForUser = async (userId) => {
  var twoWeeksAgo = DateTime.now().minus({weeks:2}).toUnixInteger();
  const params = {
    KeyConditionExpression: "userId = :s and createdOn > :t",
   
    ExpressionAttributeValues: {
      ":s": { S: userId },
      ":t": { N: twoWeeksAgo.toString() }
    },
    TableName: "Praisebot",
  };
  const data = await client.send(new QueryCommand(params));
  //console.log(data);
 
    return data.Items;
  
  
}

module.exports = dynamo;