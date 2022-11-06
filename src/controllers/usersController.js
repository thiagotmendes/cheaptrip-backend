import users from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config()

/**
 * User Controller class
 */
class UserController {
	// list all users
	static listUsers = (req, res) => {
		users.find( (error, users) => {
			res.status(200).json(users);
		})
	}

	// Get user by ID
	static getUserById = async (req, res) => {
		try {
			const id = req.params.id;
			const user = await users.findOne({ _id: id });
			res.status(200).send(user)
		} catch(error) {
			res.status(400).send({message: error})
		}
	}

	// Register User
	static saveUsers = async (req, res) => {
		// get user body param
		try {
			const {name, email, password} = req.body;
			const oldUser = await users.findOne( {email} );
			if (oldUser) {
				return res.status(409).send({message: "Usuário já existe em nosso banco de dados"});
			}
			// Encrypt password
			const passwordEncrypted = await bcrypt.hash(password, 10)
			//
			const user = await users.create({
				name,
				email: email.toLowerCase(),
				password: passwordEncrypted
			});
			// Create token
			const token = jwt.sign(
				{ user_id: user._id, email },
				process.env.TOKEN_KEY,
				{
					expiresIn: "2h",
				}
			);
			// save user token
			user.token = token;
			//
			res.status(201).send(user.toJSON())
		} catch (err) {
			console.log( "Não foi possível criar um novo usuário erro: " + err)
		}
	}

	// Update User
	static updateUser = async (req, res) => {
		const id = req.params.id;
		const {name, email, password} = req.body;
		// Encrypt password
		const passwordEncrypted = await bcrypt.hash(password, 10)
		// find and update user
		users.findByIdAndUpdate( id, {$set: {name: name, email: email, password: passwordEncrypted}}, (err) => {
			if(!err) {
				res.status(200).send({message: "User atualizado com sucesso!"})
			} else {
				res.status(500).send({message: err.message})
			}
		} )
	}

	// delete user
	static deleteUser = (req, res) => {
		const id = req.params.id;
		// Find and delete user
		users.findByIdAndDelete(id , (err) => {
			if(!err) {
				res.status(200).send({message: 'User excluido com sucesso!'})
			} else {
				res.status(500).send({ message: err.message })
			}
		})
	}
}

export default UserController;
