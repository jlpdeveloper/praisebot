# Praisebot Infrastructure Required:

## DynamoDb
The dynamo db will store all the information about the shoutouts


## ECS Cluster
An ECS Cluster running a fargate service with the docker image for the bolt slack bot api


## IAM Role
An IAM role will be needed for the ECS cluster service that will also allow access to the dynamo db

## Docker Environment Variables
- SLACK_BOT_TOKEN
- SLACK_SIGNING_SECRET