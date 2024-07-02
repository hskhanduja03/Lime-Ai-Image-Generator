// ./routes/dalleRoutes.js
import express from "express";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.route("/").get((req, res) => res.send("hello ji"));

// router.route("/").post(async (req, res) => {
//     try {
//       const { prompt } = req.body;
//       if (!prompt) {
//         return res.status(400).json({ error: "Prompt is required" });
//       }
//       const aiResponse = await openai.createImage({
//         prompt,
//         n: 1,
//         size: "1024x1024",
//         response_format: "b64_json",
//       });
  
//       const image = aiResponse.data.data[0].b64_json;
//       res.json({ photo: image });
//     } catch (error) {
//       console.error("OPENAI - IMAGE ERROR :: ", error.response?.data || error.message || error);
//       res.status(500).json({ error: "An error occurred while generating the image." });
//     }
//   });


// router.route("/").post(async (req, res) => {
    
// }
  

export default router;
