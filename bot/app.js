// Require the Bolt package (github.com/slackapi/bolt)
const shoutout = require('./slash-shoutout');
const appHome = require('./app-home');
const app = require('./app.module');
// Listen for a slash command invocation
app.command('/shoutout', shoutout.slash); 
app.action('recognize-details-action', shoutout.recongition_event);
app.action('users_select-shoutout-action', shoutout.user_select_action);

app.event('app_home_opened', appHome);

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();
