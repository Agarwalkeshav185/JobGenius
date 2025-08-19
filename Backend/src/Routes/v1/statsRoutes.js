import express from "express";
import { getHomePageStats } from "../../controllers/statsController.js";

const router = express.Router();

// public Routes
router.get("/homepage", getHomePageStats);

export default router;
