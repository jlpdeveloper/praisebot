// Require the Bolt package (github.com/slackapi/bolt)

const shoutout = require('./slash-shoutout');
const app = require('./app.module');

// Listen for a slash command invocation
app.command('/helloworld', shoutout.slash); 

app.event('message', async({ event, client, context }) => {
  //console.log(event);
  try {
    const result = await app.client.chat.postMessage({
      token: context.botToken,
      // Channel to send message to
      channel: event.channel,
      // Include a button in the message (or whatever blocks you want!)
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'Echo:' + event.text
          },
        
        }
      ],
      // Text in the notification
      text: 'Message from Test App'
    });
     }
  catch (error) {
    console.error(error);
  }
});
app.action('recognize-details-action', async({ack, body, context}) =>{
  ack();
  console.log(body);
  try{
      const result = await app.client.chat.update({
      token: context.botToken,
      // ts of message to update
      ts: body.message.ts,
      // Channel of message
      channel: body.channel.id,
      blocks: [
      {
			"type": "section",
			"text": {
				"type": "plain_text",
				"text": "Great! We'll post this to the #shoutouts channel!",
				"emoji": true
			}
		
		}
      ],
      //text: body.actions[0].selected_user
   
    });
  }
  catch(error){
    throw error;
  }
});
// Listen for a button invocation with action_id `button_abc`
// You must set up a Request URL under Interactive Components on your app configuration page
app.action('users_select-shoutout-action', async ({ ack, body, context }) => {
  // Acknowledge the button request
  ack();
 // console.log(body)

   try {
     // Update the message
    const result = await app.client.chat.update({
      token: context.botToken,
      // ts of message to update
      ts: body.message.ts,
      // Channel of message
      channel: body.channel.id,
      blocks: [
       {
			"dispatch_action": true,
			"type": "input",
			"element": {
				"type": "plain_text_input",
				"action_id": "recognize-details-action"
			},
			"label": {
				"type": "plain_text",
				"text": "What did they help you with?",
				"emoji": true
			}
		}
      ],
      text: body.actions[0].selected_user
   
    });
   // console.log(result); 
   }
  catch (error) {
    console.error(error);
  }
});


// All the room in the world for your code

app.event('app_home_opened', async ({ event, client, context }) => {
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
              "text": "*Welcome to your _App's Home_* :tada:"
            }
          },
          {
            "type": "divider"
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "This button won't do much for now but you can set up a listener for it using the `actions()` method and passing its unique `action_id`. See an example in the `examples` folder within your Bolt app."
            }
          },
          {
            "type": "actions",
            "elements": [
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "Click me?"
                }
              }
            ]
          }
        ]
      }
    });
  }
  catch (error) {
    console.error(error);
  }
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
