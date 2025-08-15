import express from "express";
import * as companyController from "../../controllers/companyController.js";

const router = express.Router();

// Only admin should access these routes (add auth middleware as needed)
router.post("/create", companyController.create);
router.get("/getAll", companyController.getAll);
router.get("/get/:id", companyController.getById);
router.put("/update/:id", companyController.update);
router.delete("/delete/:id", companyController.remove);

export default router;