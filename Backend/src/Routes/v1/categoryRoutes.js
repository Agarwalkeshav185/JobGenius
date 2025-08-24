import express from "express";
import * as categoryController from "../../controllers/categoryController.js";

const router = express.Router();

router.get("/getAll", categoryController.getAll);
router.get("/getAllJobCount", categoryController.getAllWithActiveJobCount);
router.get("/:id", categoryController.getById);

// Admin Routes
router.post("/create", categoryController.create);

router.put("/:id", categoryController.update);
router.delete("/:id", categoryController.remove);

export default router;