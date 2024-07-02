import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios"; // Import axios
import connectDb from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const app = express();

// CORS configuration
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());

// Route configuration
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get("/", (req, res) => {
  res.send("<h1>hello ji</h1>");
});

// Proxy route
app.post("/proxy", async (req, res) => {
  try {
    const response = await axios.post("https://api.limewire.com/api/image/generation", req.body, {
      headers: {
        "Content-Type": "application/json",
        "X-Api-Version": "v1",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.LIME_URL_API_KEY}`
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

// Connect to MongoDB and start the server
const connectServer = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    app.listen(process.env.PORT, () => {
      console.log("Server started on port 3000");
    });
  } catch (error) {
    console.log("MONGODB_ERR :: ", error);
  }
};

connectServer();
