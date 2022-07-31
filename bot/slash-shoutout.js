const app = require("./app.module");
const userUtility = require("./utilities/user.utility");
const shoutoutChannelUtil = require("./utilities/shoutout.channel.utility");
let shoutout = {};
let shoutStore = {};

shoutout.slash = async ({ ack, payload, context }) => {
  // Acknowledge the command request
  ack();
  try {
    await app.client.chat.postEphemeral({
      token: context.botToken,
      // Channel to send message to
      channel: payload.channel_id,
      user: payload.user_id,
      // Include a button in the message (or whatever blocks you want!)
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "Who do you want to shoutout? ",
          },
          accessory: {
            type: "users_select",
            placeholder: {
              type: "plain_text",
              text: "Select a user",
              emoji: true,
            },
            action_id: "users_select-shoutout-action",
          },
        },
      ]
    });

  } catch (error) {
    console.error(error);
  }
};

shoutout.recongition_event = async ({ ack, body, context }) => {
  ack();
  try {
    await app.client.chat.postEphemeral({
      token: context.botToken,
      // ts of message to update
      ts: body.container.message_ts,
      user: body.user.id,
      // Channel of message
      channel: body.channel.id,
      blocks: [
        {
          type: "section",
          text: {
            type: "plain_text",
            text: "Great! We'll post this to the #shoutouts channel!",
            emoji: true,
          },
        },
      ]
    });

    var userInfo = await userUtility.getUserById(
      shoutStore[body.user.id].selected_user
    );

    await shoutoutChannelUtil.postShoutoutMessage(
      body.user.name,
      userInfo.name,
      body.actions[0].value
    );
    delete shoutStore[body.user.id];
  } catch (error) {
    throw error;
  }
};

shoutout.user_select_action = async ({ ack, body, context }) => {
  // Acknowledge the button request
  ack();
  try {
    shoutStore[body.user.id] = {
      selected_user: body.actions[0].selected_user,
    };
    // Update the message
    const result = await app.client.chat.postEphemeral({
      token: context.botToken,
      // ts of message to update
      ts: body.container.message_ts,
      user: body.user.id,
      // Channel of message
      channel: body.channel.id,
      blocks: [
        {
          dispatch_action: true,
          type: "input",
          element: {
            type: "plain_text_input",
            action_id: "recognize-details-action",
          },
          label: {
            type: "plain_text",
            text: "What did they help you with?",
            emoji: true,
          },
        },
      ]
    });

  } catch (error) {
    console.error(error);
  }
};

module.exports = shoutout;
