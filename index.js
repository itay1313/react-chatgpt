
const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Creatre a simple express api that calls the function above


const app = express();
const port = 3080;

app.post("/", async (req, res) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Say this is a test",
    max_tokens: 7,
    temperature: 0,
  });
  console.log(response.data.choices[0].text)
  res.json({
    data: response.data
  })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});