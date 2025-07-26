import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import apiRouter from "./server/api/api.js";
import { loadDocTypes } from "./server/core/doctypeLoader.js";
import { authMiddleware } from "./server/utils/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

await loadDocTypes();

app.use("/api", authMiddleware, apiRouter);

app.listen(PORT, () => {
  console.log(`Nohman-Framework server running on port ${PORT}`);
});
