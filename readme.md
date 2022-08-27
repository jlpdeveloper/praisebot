# Praisebot - an open source shoutout slack bot
This bot was designed to gain a basic understanding how bolt slack bots work!

## Todo
- Machine learning that will identifiy tech keywords and provide pain problem areas report?
- User directory redirect link


## Installation Instructions

### Creating a slack app
1. Login to slack on your web browser, then visit https://api.slack.com/apps?new_app=1
2. Select "From app manifest"
3. Select your workspace
4. Open the `./design-docs/slack.app.manifest.yaml`, replace `{{yoururlhere}}` with the url you plan to use for the slack app
5. Copy the manifest yaml from `./design-docs/slack.app.manifest.yaml` and paste where it asks you for the yaml file
6. Confirm everything looks good then click create


### Create the slack bot server
1. Create a `terraform.tfvars` file with the following variables
   ```
        ecs_cluster = "your cluster arn"
        vpc         = "your vpcid"
        vpc_cidr    = "your vpc CIDR"
        subnets     = ["subnets for your service"]
        environment_variables = [
        {
            "name" : "SLACK_BOT_TOKEN",
            "value" : "your slack bot token "
        },
        {
            "name" : "SLACK_SIGNING_SECRET",
            "value" : "your signing secret"
        },
        {
            "name" : "TIMEZONE",
            "value" : "America/New_York"
        }


        ]
   ```
2. Grab the ecs cluster arn, vpc, etc from AWS
3. Grab the Signing Secret from App Credentials in slack api
4. Create a slack bot token
5. Add those to the terraform variables
6. Use terraform to deploy (you can use the default docker image or create your own)
