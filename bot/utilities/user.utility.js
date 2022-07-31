const app = require('../app.module');
let utility = {};

utility.getUserById = async (userId) => {
    try {
        // Call the users.info method using the WebClient
        const result = await app.client.users.info({
          user: userId,
          token: process.env.SLACK_BOT_TOKEN
        });
        return result.user;
      }
      catch (error) {
        console.error(error);
      }
};

module.exports = utility;