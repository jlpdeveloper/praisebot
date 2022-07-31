const app = require('../app.module');
let utility = {};

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
// You probably want to use a database to store any conversations information ;)
let conversationsStore = {};


// Put conversations into the JavaScript object
function saveConversations(conversationsArray) {
  let conversationId = '';
  
  conversationsArray.forEach(function(conversation){
    // Key conversation info on its unique ID
    conversationId = conversation["name"];
    
    // Store the entire conversation object (you may not need all of the info)
    conversationsStore[conversationId] = conversation;
  });
}
async function getChannelsFromApi(){
    try {
        // Call the conversations.list method using the WebClient
        const result = await app.client.conversations.list({
            token: process.env.SLACK_BOT_TOKEN
          });
    
        saveConversations(result.channels);
      //  console.log(conversationsStore);
      }
      catch (error) {
        console.error(error);
      }
}

utility.getChannel = async() =>{
   if(Object.keys(conversationsStore).length === 0){
    await getChannelsFromApi();
   }
  
    if(conversationsStore["shoutouts"] === undefined){
        await createChannel();
        await getChannelsFromApi();
    }
 // console.log(conversationsStore["shoutouts"]);
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
      ],
      // Text in the notification
     // text: 'Message from Test App'
    });
   // console.log(result);
  }
  catch (error) {
    console.error(error);
  }
};


module.exports = utility;