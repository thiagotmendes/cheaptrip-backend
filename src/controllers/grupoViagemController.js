import gruposViagem from "../models/GruposViagem.js";

/**
 * Grupo viagem controller class
 */
class GruposViagemController {
	// get all travel groups
	static getGruposViagem = (req, res) => {
		gruposViagem.find((err, gruposViagem) => {
			if(!err) {
				res.status(200).json(gruposViagem);
			}
		});
	}

	// get travel group by  group id
	static getGrupoViagemById = (req, res) => {
		const grupoId = req.params.id;
		gruposViagem.findById( grupoId, (err, grupoViagem) => {
			if(!err) {
				res.status(200).json(grupoViagem)
			} else {
				res.status(400).send({message: "Erro ao tentar encontrar grupos de viagem: " + err})
			}
		})
	}

	// get travel group by  group user_id
	static getGrupoViagemByUserId = (req, res) => {
		const userId = req.params.user_id;
		gruposViagem.find(  {idUser: userId}, (err, grupoViagem) => {
			if(!err) {
				res.status(200).json(grupoViagem)
			} else {
				res.status(400).send({message: "Erro ao tentar encontrar grupos de viagem: " + err})
			}
		})
	}

	// save travel group
	static saveGrouposViagem = (req, res) => {
		let grupo = new gruposViagem(req.body)
		grupo.save((err) => {
			if(err) {
				res.status(500).send({ message: `${err.message} - falha ao cadastrar um novo grupo`})
			} else {
				res.status(201).send(grupo.toJSON())
			}
		});
	}

	// Atualiza o banco de dados
	static updateGrupoViagem = (req, res) => {
		let grupoId = req.params.id;
		gruposViagem.findByIdAndUpdate(grupoId, {$set: req.body}, (err) => {
			if(!err) {
				res.status(200).send({message: "User atualizado com sucesso!"})
			} else {
				res.status(500).send({message: err.message})
			}
		}) ;
	}

	// Deleta o grupo de viagem
	static deleteGrupoViagem = (req, res) => {
		let grupoId = req.params.id;
		gruposViagem.findByIdAndDelete(grupoId, (err) => {
			if(!err) {
				res.status(200).send({message: 'Grupo excluido com sucesso!'})
			} else {
				res.status(500).send({ message: err.message })
			}
		});
	}
}

export default GruposViagemController;
