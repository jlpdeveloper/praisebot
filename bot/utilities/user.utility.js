const app = require('../app.module');
let utility = {};

utility.getUserById = async (userId) => {
    try {
    // console.log(userId);
        // Call the users.info method using the WebClient
        const result = await app.client.users.info({
          user: userId,
          token: process.env.SLACK_BOT_TOKEN
        });
      
      //  console.log(result.user);
        return result.user;
      }
      catch (error) {
        console.error(error);
      }
};

module.exports = utility;