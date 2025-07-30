// openaiclient.js
require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateProverb() {
  try {
    const res = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Generate a short one-line original proverb or quote.",
        },
      ],
      temperature: 0.8,
      max_tokens: 30,
    });

    return res.choices[0].message.content.trim();
  } catch (err) {
    console.error("❌ OpenAI Error:", err.response?.data || err.message);
    return "Wisdom is earned, not given.";
  }
}

module.exports = { generateProverb };
