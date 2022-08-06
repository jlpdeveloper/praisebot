const dynamo = require('./utilities/dynamodb.utility');
let appHome = async ({ event, client, context }) => {
    try {
        var shoutOuts = await dynamo.getShoutoutsForUser(event.user);
        console.log('Shoutouts:', shoutOuts);
        let shoutBlocks = [{
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "*Welcome to your _Praisebot!_* :tada:"
            }
        }];
        shoutOuts.forEach(shout => {
            shoutBlocks.push({
                "type": "divider"
            });
            shoutBlocks.push(createSection(shout));

        });
        /* view.publish is the method that your app uses to push a view to the Home tab */
        const result = await client.views.publish({

            /* the user that opened your app's app home */
            user_id: event.user,

            /* the view object that appears in the app home*/
            view: {
                type: 'home',
                callback_id: 'home_view',

                /* body of the view */
                blocks: shoutBlocks
            }
        });
    }
    catch (error) {
        console.error(error);
    }
};
function createSection(shoutOut) {
    return {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": ":star:<@" + shoutOut.createdBy.S + ">: " + shoutOut.message.S + ":star:"
        }
    };
}

module.exports = appHome;