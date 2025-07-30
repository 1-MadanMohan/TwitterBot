require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const { twitterClient } = require("./twitterClient");
const { generateProverb } = require("./openaiClient");

const CronJob = require("cron").CronJob;
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

// Function to generate and tweet AI-generated proverb
const tweet = async () => {
  try {
    const proverb = await generateProverb();
    const timestamp = new Date().toLocaleString();

    const res = await twitterClient.v2.tweet(`${proverb} ⏰ ${timestamp}`);
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
