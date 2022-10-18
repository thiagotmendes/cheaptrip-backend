import express, { Router }  from "express";
import UserController from "../controllers/usersController.js";

const router = express.Router();
router
	// Router verbs
	.get("/users", UserController.listUsers)
	.get("/users/:id", UserController.getUserById)
	.post("/users", UserController.saveUsers)
	.put("/users/:id", UserController.updateUser)
	.delete("/users/:id", UserController.deleteUser)

// Export router
export default router;
