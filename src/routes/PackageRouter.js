import express from "express";
import packageController from "../controllers/packageController.js";
import auth from "../middleware/auth.js"

const router = express.Router();

router
	.get("/packages", packageController.getPackages)
	.get("/packages/:id", packageController.getPackageById)
	.post('/packages', auth, packageController.savePackage)
	.delete('/packages/:id', auth, packageController.deletePackage)

export default router;
