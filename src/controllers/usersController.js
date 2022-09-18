import users from "../models/User.js";

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
    static saveUsers = (req, res) => {
        // get user body param 
        const user = new users(req.body);
        // Save user method
        user.save( (err) => {
            if(err) {
                res.status(500).send({ message: `${err.message} - falha ao cadastrar Usuário`})
            } else {
                res.status(201).send(user.toJSON())
            }
        })
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