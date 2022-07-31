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
***Aliases: `/praise`***
**Inputs:** the `@username` for a user to shoutout

**Response:** Reply asking for details on what the shoutout is about

**Actions:** This will store the username, date as ticks, details on shoutout and who did shoutout in a dynamo db