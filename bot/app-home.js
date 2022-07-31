
let appHome = async ({ event, client, context }) => {
    try {
        /* view.publish is the method that your app uses to push a view to the Home tab */
        const result = await client.views.publish({

            /* the user that opened your app's app home */
            user_id: event.user,

            /* the view object that appears in the app home*/
            view: {
                type: 'home',
                callback_id: 'home_view',

                /* body of the view */
                blocks: [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "*Welcome to your _Praisebot!_* :tada:"
                        }
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "In the future, this will show your most recent shoutouts, but for now I'm just here to tell you good job!"
                        }
                    },
                    
                ]
            }
        });
    }
    catch (error) {
        console.error(error);
    }
};


module.exports = appHome;