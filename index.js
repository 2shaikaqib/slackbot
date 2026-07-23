const axios = require("axios");
require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/revered-snake-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Who dares to summon me!\nLatency: ${latency}ms` });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();

app.command("/revered-snake-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/revered-snake-ping - Check bot latency
/revered-snake-catfact - Get a cat fact
/revered-snake-joke - makes a joke :D
/revered-snake-catimg - gives cute cat url image`
  });
});

app.command("/revered-snake-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Here is a fact about a cat:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});

app.command("/revered-snake-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text:
` I have been commanded to joke : ${response.data.setup}

${response.data.punchline}`
    });
  } catch (err) {
    await respond({ text: "Failed to fetch a joke." });
  }
});

app.command("/revered-snake-catimg", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://api.thecatapi.com/v1/images/search");
    const catImageUrl = response.data[0].url;
    await respond({ text: `Cats are from my legacy, look at them!:\n${catImageUrl}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat image." });
  }
});
