const app = require("./app.module");
const dynamo = require('./utilities/dynamodb.utility');
const shoutoutChannelUtil = require("./utilities/shoutout.channel.utility");
const { DateTime } = require("luxon");
let report = {};
report.postReport = async (since) => {
    console.log('calling post report');
    var shoutOuts = await dynamo.getShoutoutsSince(since);
    console.log(shoutOuts);
    let mvps ={}
    shoutOuts.forEach(shout => {
        if(Object.keys(mvps).indexOf(shout.userId.S) < 0){
            mvps[shout.userId.S] = {name: shout.recipientName.S, count: 1};
        }
        else{
            mvps[shout.userId.S].count = mvps[shout.userId.S].count + 1; 
        }
    });
    console.log(mvps);
    var blocks = createMVPReport(mvps);
    
    await app.client.chat.postMessage({
        token: process.env.SLACK_BOT_TOKEN,
       
        // Channel of message
        channel: await shoutoutChannelUtil.getChannel(),
        blocks:blocks,
        text: 'Shoutout Report!'
      });
};

report.slash = async ({ ack, payload, context }) => {
    await ack();
    try {
        console.log('attempting slash command');
        var startOfWeek = DateTime.now().setZone(process.env.TIMEZONE).startOf('week').toUnixInteger();
        await report.postReport(startOfWeek);
    } catch (error) {
        console.log(error);
        throw error;
    }
};
function createMVPReport(mvps){
    var list = [{
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": "*Here are the MVPs for the past week!* :tada:"
        }
    }];
    if(mvps.length > 5){
        let temp = Object.entries(mvps).sort((x, y) => y[1].count - x[1].count).slice(0,4);
        temp.forEach(mvpArray => {
            let mvp  = mvpArray[1];
            list.push({
                "type": "divider"
            });
            list.push(createSection(mvp.name, mvp.count));
        });
    }
    else{
        Object.keys(mvps).forEach(key => {
            list.push({
                "type": "divider"
            });
            let mvp = mvps[key];
            list.push(createSection(mvp.name, mvp.count));
        });
    }
    return list;
}
function createSection(name, ctr) {
    return {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": "*:star:Shoutout to <@"+ name +">*: " + ctr + " shoutouts this week!:star:"
            
        }
    };
}
module.exports = report;