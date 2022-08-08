// Require the Bolt package (github.com/slackapi/bolt)
const shoutout = require('./slash-shoutout');
const report = require('./slash-report');
const appHome = require('./app-home');
const app = require('./app.module');
var cron = require('node-cron');
const { DateTime } = require("luxon");

cron.schedule('0 0 16 * * 1', () => {
  var startOfWeek = DateTime.now().setZone('America/New_York').minus({days:1}).startOf('week').toUnixInteger();
  report.postReport(startOfWeek);
}, {
  scheduled: true,
  timezone: "America/New_York"
});
// Listen for a slash command invocation
app.command('/shoutout', shoutout.slash); 
app.command('/mvps', report.slash);
app.action('recognize-details-action', shoutout.recongition_event);
app.action('users_select-shoutout-action', shoutout.user_select_action);

app.event('app_home_opened', appHome);

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();
