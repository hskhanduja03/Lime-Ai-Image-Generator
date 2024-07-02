import express from "express";
import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";

import Post from "../mongodb/models/Post.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route("/").get(async (req, res) => {
    try {
      const allPosts = await Post.find({})
  
  
      res.status(200).json({success:true, data:allPosts});
    } catch (error) {
      res.status(500).json(error);
    }
  });

router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const phototURL = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
      name,
      prompt,
      photo: phototURL.url,
    });

    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
