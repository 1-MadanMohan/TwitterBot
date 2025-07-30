// require("dotenv").config({ path: __dirname + "/.env" });
// const express = require('express')
// const app = express()
// const port = process.env.PORT || 3000;
// const { twitterClient } = require("./twitterClient.js")
// const CronJob = require("cron").CronJob;

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`)
// })

// const tweet = async () => {
//   try {
//     await twitterClient.v2.tweet("Hello world!");
//   } catch (e) {
//     console.log(e)
//   }
// }

// const cronTweet = new CronJob("30 * * * * *", async () => {
//   tweet();
// });

// cronTweet.start();

// //Twitter/X does not allow posting the exact same tweet more than once, 
// // even if it's posted at different times. Your bot is trying to tweet 
// // "Hello world!" every minute — which is duplicate content, hence it’s blocked.









require("dotenv").config({ path: __dirname + "/.env" });
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { twitterClient } = require("./twitterClient.js");
const CronJob = require("cron").CronJob;

app.listen(port, () => {
  console.log(`🚀 Listening on port ${port}`);
});

// Unique tweet content using timestamp
const tweet = async () => {
  const timestamp = new Date().toLocaleString();
  try {
    const res = await twitterClient.v2.tweet(`Hello world! ⏰ ${timestamp}`);
    console.log("✅ Tweet sent at", timestamp);
  } catch (e) {
    console.error("❌ Tweet error:", e);
  }
};

// Cron job: Runs at 30 seconds every minute
const cronTweet = new CronJob("30 * * * * *", async () => {
  console.log("⏰ Running tweet job...");
  await tweet();
});

cronTweet.start();
