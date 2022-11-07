import express, { Router }  from "express";
import UserController from "../controllers/usersController.js";
import auth from "../middleware/auth.js"

const router = express.Router();
router
	// Router verbs
	.get("/users", UserController.listUsers)
	.get("/users/:id", UserController.getUserById)
	.get("/me", auth, UserController.getCurrentByToken)
	.post("/me", auth, UserController.saveCurrentUserByToken)
	.post("/users", UserController.saveUsers)
	.put("/users/:id", UserController.updateUser)
	.delete("/users/:id", UserController.deleteUser)

// Export router
export default router;
