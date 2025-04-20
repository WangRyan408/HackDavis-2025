import express from "express";
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "../uploadthing.js";
import dotenv from "dotenv";


const router = express.Router();

router.use(
  "/api/uploadthing",
  createRouteHandler({ 
    router: uploadRouter, 
    config: 
    { callbackUrl: "http://localhost:3000/api/uploadthing",
      token: process.env.UPLOADTHING_TOKEN,
      isDev: true,
      }, })
);

router.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });
  

export default router;