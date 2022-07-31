const app = require('./app.module');
let shoutout = {};


shoutout.slash = async  ({ ack, payload, context }) => {
    // Acknowledge the command request
    ack();
   // console.log(payload);
  
    try {
      const result = await app.client.chat.postMessage({
        token: context.botToken,
        // Channel to send message to
        channel: payload.channel_id,
        // Include a button in the message (or whatever blocks you want!)
        blocks: [
                  {
              "type": "section",
              "text": {
                  "type": "mrkdwn",
                  "text": "Who do you want to shoutout? "
              },
              "accessory": {
                  "type": "users_select",
                  "placeholder": {
                      "type": "plain_text",
                      "text": "Select a user",
                      "emoji": true
                  },
                  "action_id": "users_select-shoutout-action"
              }
          }
        ],
        // Text in the notification
        text: 'Message from Test App'
      });
     // console.log(result);
    }
    catch (error) {
      console.error(error);
    }
  };

  shoutout.recongition_event = async({ack, body, context}) =>{
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
  };

shoutout.user_select_action = async ({ ack, body, context }) => {
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
};

module.exports = shoutout;
