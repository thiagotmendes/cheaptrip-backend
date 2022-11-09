import gruposViagem from "../models/GruposViagem.js";
import { convertPtBrToDate, dateDiffInDays } from "../utils/date.js";

/**
 * Grupo viagem controller class
 */
class GruposViagemController {
	// get all travel groups
	static getGruposViagem = (req, res) => {
		gruposViagem.find((err, gruposViagem) => {
			if(!err) {
				const responseAdapter = gruposViagem.map(item => {
					return {
						_id: item._id,
						title: item.title,
						description: item.description,
						destination: item.destination,
						imageAddress: item.imageAddress,
						departureDate: item.departureDate,
						returnDate: item.returnDate,
						participants: item.participants,

						price: item.price,
						idUser: item.idUser,
						nights: dateDiffInDays(item.departureDate, item.returnDate)
					}
				})
				res.status(200).json(responseAdapter.reverse());
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
		const userIdFromCurrentJwtToken = req.user.user_id;
		let grupo = new gruposViagem({
			...req.body,
			idUser: userIdFromCurrentJwtToken,
			departureDate: convertPtBrToDate(req.body.departureDate),
			returnDate: convertPtBrToDate(req.body.returnDate)
		})
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
