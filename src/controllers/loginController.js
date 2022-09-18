import users from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config()

class LoginController {
	// User login method
	static login = async (req, res) => {
		try {
			const {email, password} = req.body;
			// get user by email
			const user = await users.findOne({email});
			// Verify user and password
			if(user && (await bcrypt.compare(password, user.password))) {
				// create JWT Token
				const token = jwt.sign(
					{user_id: user._id, email },
					process.env.TOKEN_KEY,
					{
						expiresIn: "2h"
					}
				);
				// save user token
				user.token = token;
				// user
				res.status(200).json(user);
			}
			// if creadtials are invalid
			res.status(400).send({message: "Invalid Credentials"});
		} catch (err) {
			console.log("Erro ao tentar efetuar login: " + err)
		}
	}


}

export default LoginController
