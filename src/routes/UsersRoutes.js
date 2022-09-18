import express, { Router }  from "express";
import UserController from "../controllers/usersController.js";

const router = express.Router();
router
	// Router verbs
	.get("/users", UserController.listUsers)
	.get("/user/:id", UserController.getUserById)
	.post("/user/save", UserController.saveUsers)
	.put("/user/update/:id", UserController.updateUser)
	.delete("/user/delete/:id", UserController.deleteUser)

// Export router
export default router;
