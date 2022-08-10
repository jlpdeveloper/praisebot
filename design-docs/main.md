# Praisebot

## Purpose
This app is created to:

- Post shoutouts to a `#shoutouts` channel
- Create the `#shoutouts` channel
- Store shoutouts in a dynamo db
- Provide weekly reports for mvps based on number of shoutouts in that timeframe, and report the #shoutouts table

## App Home
The App home page will show recent shoutouts (~last 10?) for the user that opens the shoutout page

## Weekly MVP Report
 This will post directly the top 5 MVP users who have had the most shoutouts  in the week

## Slash Commands

### `/shoutout` 
---

Creates an interactive message with the user, prompting them to select the user to shout out and provide a message

**Response:** Reply asking for details on what the shoutout is about

**Actions:** This will store the username, date as ticks, details on shoutout and who did shoutout in a dynamo db


### `/mvps`
---

Shows a report in the shoutout channel since the start of the week
**Actions:** This will make a top 5 mvps report in the shoutout channel since the start of the week based on the time zone passed in as the `TIMEZONE` environment parameter.