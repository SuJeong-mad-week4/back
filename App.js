// src/app.js
const express = require("express");
const axios = require("axios");
require("dotenv").config();
const OpenAI = require('openai-nodejs');
const app = express();
const routes = require("./src/routes");
const cors = require("cors"); // Import the cors package

// Enable CORS for all routes
app.use(cors()); // This allows all CORS requests

app.use(express.json());
app.use("/", routes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
console.log(typeof( process.env.OPENAI_API_KEY))

app.post("/chat", async (req, res) => {
  const response = await axios.post(
    "https://naveropenapi.apigw.ntruss.com/text-summary/v1/summarize",
    {
      document: {
        content: req.body.content,
        title: "test",
      },
      option: {
        language: "ko",
        model: "general",
      },
    },
    {
      headers: {
        "X-NCP-APIGW-API-KEY-ID": "z8duzxoqhv",
        "X-NCP-APIGW-API-KEY": "QruK9TZNHXYfDc9Sq5i7NhrPvZ7NLkfByOPYap1h",
        "content-type": "application/json",
      },
    }
  );
  res.json(response.data);
});