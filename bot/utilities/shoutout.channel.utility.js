const app = require('../app.module');
let utility = {};
let conversationsStore = {};

utility.getChannel = async() =>{
   if(Object.keys(conversationsStore).length === 0){
    await getChannelsFromApi();
   }
  
    if(conversationsStore["shoutouts"] === undefined){
        await createChannel();
        await getChannelsFromApi();
    }
   return conversationsStore["shoutouts"].id;
};

utility.postShoutoutMessage = async (createdBy, user, message) =>{
  try {
    var channel_id = await utility.getChannel();
    const result = await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      // Channel to send message to
      channel: channel_id,
      // Include a button in the message (or whatever blocks you want!)
      blocks: [
        {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*:star:Shoutout to <@"+ user +">*:star:\n_By <@"+ createdBy +">_\n For: " + message
          },
          
        },
      ]
    });
  }
  catch (error) {
    console.error(error);
  }
};

async function createChannel (){
  try {
      // Call the conversations.create method using the WebClient
      const result = await app.client.conversations.create({
        // The name of the conversation
        name: "shoutouts",
        token: process.env.SLACK_BOT_TOKEN
      });
    
      // The result will include information like the ID of the conversation
    //  console.log(result);
    }
    catch (error) {
      console.error(error);
    }
};

// Put conversations into the JavaScript object
function saveConversations(conversationsArray) {
  let conversationnName = '';
  
  conversationsArray.forEach(function(conversation){
    conversationnName = conversation["name"];
    conversationsStore[conversationnName] = conversation;
  });
}
async function getChannelsFromApi(){
    try {
        // Call the conversations.list method using the WebClient
        const result = await app.client.conversations.list({
            token: process.env.SLACK_BOT_TOKEN
          });
    
        saveConversations(result.channels);
      }
      catch (error) {
        console.error(error);
      }
}


module.exports = utility;
