import express from "express";
import * as companyController from "../../controllers/companyController.js";
import { isAuthenticated, isAuthorized } from "../../middlewares/auth-middleware.js";

const router = express.Router();

// Only admin should access these routes (add auth middleware as needed)

router.get("/getAll", companyController.getAll);
router.get("/get/:id", companyController.getById);

router.post("/create", isAuthenticated, companyController.create);
router.put("/update/:id", isAuthenticated, isAuthorized('Admin', 'Manager'), companyController.update);
router.delete("/delete/:id", isAuthenticated, isAuthorized('Admin'), companyController.remove);

export default router;