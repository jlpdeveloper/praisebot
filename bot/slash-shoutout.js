const app = require('./app.module');
const userUtility = require('./utilities/user.utility');
const shoutoutChannelUtil = require('./utilities/shoutout.channel.utility');
let shoutout = {};


shoutout.slash = async ({ ack, payload, context }) => {
  // Acknowledge the command request
  ack();
  try {
    const result = await app.client.chat.postMessage({
      token: context.botToken,
      // Channel to send message to
      channel: payload.channel_id,
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
      ]
    });
  }
  catch (error) {
    console.error(error);
  }
};

shoutout.recongition_event = async ({ ack, body, context }) => {
  ack();
  try {
    await app.client.chat.update({
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

    });
    var userInfo = await userUtility.getUserById(body.message.text);
    await shoutoutChannelUtil.postShoutoutMessage(body.user.name, userInfo.name, body.actions[0].value);

  }
  catch (error) {
    throw error;
  }
};

shoutout.user_select_action = async ({ ack, body, context }) => {
  // Acknowledge the request
  ack();
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

  }
  catch (error) {
    console.error(error);
  }
};

module.exports = shoutout;
