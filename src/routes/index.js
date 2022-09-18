import express from "express";
// Import especifcs routes
import users from "./UsersRoutes.js";
import login from "./UserLogin.js";
// import auth from "../middleware/auth.js"

const routes = (app) => {
	app.route('/').get((req,res) => {
		res.status(200).send({titulo: "Curso de node"})
	} )

	app.use(
		express.json(),
		users,
		login
	)
}

export default routes;
