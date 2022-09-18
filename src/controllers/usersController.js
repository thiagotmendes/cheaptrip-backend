import users from "../models/User.js";
import bcrypt from "bcrypt";

class UserController {
	// list all users
	static listUsers = (req, res) => {
		users.find( (error, users) => {
			res.status(200).json(users);
		})
	}

	// Get user by ID
	static getUserById = (req, res) => {
		// get the id parameter
		const id = req.params.id;
		// find user by id
		users.findById( (err, users) => {
			if(err) {
				res.status(400).send({message: `${err.message} - Usuário não encontrado`})
			} else {
				res.status(200).send(autores)
			}
		} )
	}

	// Register User
	static saveUsers = async (req, res) => {
		// get user body param
		try {
			const {name, email, password} = req.body;
			const oldUser = await users.findOne( {email} );
			if (oldUser) {
				return res.status(409).send("Usuário já existe em nosso banco de dados");
			}
			// Encrypt password
			const passwordEncrypted = await bcrypt.hash(password, 10)
			//
			const user = await users.create({
				name,
				email: email.toLowerCase(),
				password: passwordEncrypted
			});
			//
			res.status(201).send(user.toJSON())
		} catch (err) {
			console.log( "Não foi possível criar um novo usuário erro: " + err)
		}
	}

	// Update User
	static updateUser = (req, res) => {
		const id = req.params.id;
		// find and update user
		users.findByIdAndUpdate( id, {$set: req.body}, (err) => {
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
