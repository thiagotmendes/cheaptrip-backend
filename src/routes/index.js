import express from "express";
// Import especifcs routes
import users from "./UsersRouter.js";
import login from "./UserLoginRouter.js";
import gruposViagem from "./GruposViagemRouter.js";
// import auth from "../middleware/auth.js"

const routes = (app) => {
	app.route('/').get((req,res) => {
		res.status(200).send({titulo: "Curso de node"})
	} )

	app.use(
		express.json(),
		users,
		login,
		gruposViagem
	)
}

export default routes;
