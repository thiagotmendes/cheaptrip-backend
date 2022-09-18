import express from "express";
// Import especifcs routes 
import users from "./UsersRoutes.js";

const routes = (app) => {
    app.route('/').get( (req,res) => {
        res.status(200).send({titulo: "Curso de node"})
    } )

    app.use( 
        express.json(), 
        users,
    )
}

export default routes;