import participantsGrupo from "../models/ParticipantsGrupo.js";
import gruposViagem from "../models/GruposViagem.js";

/**
 *
 */
class participantsGrupoController {

	/**
	 * Add participants to groups
	 * @param {*} req
	 * @param {*} res
	 */
	static addParticipantGrupo = async (req, res) => {
		const grupoViagemId = req.body.idGrupoViagem;

		/** Get group object */
		const isGroupExist = await this.getGroupIfExists(grupoViagemId)
		const verifyParticipant = await this.verifyGroupParticipants(grupoViagemId)
		if(isGroupExist) {
			/** if there`s no participant start`s to add */
			if(verifyParticipant.length === 0) {
				try {
					const participants = new participantsGrupo({ ...req.body });
					participants.save((err) => {
						if(!err) {
							res.status(201).send(participants.toJSON())
						} else {
							res.status(500).send({ message: `${err.message} - falha ao adicionar pariticipantes ao grupo`})
						}
					})
				} catch (err) {
					res.send({message: `Falha ao tentar cadastrar participante: ${err}`})
				}
			} else {
				/** update collection with new participants */
				const arrayParticipants = verifyParticipant.participants;
				const participantsBody = req.body.participants;
				console.log(arrayParticipants.length)
				/** verify qtd participants in this group */
				if(arrayParticipants.length <= verifyParticipant.qtdParticipants) {
					arrayParticipants.push(participantsBody[0])
					participantsGrupo.findOneAndUpdate({ idGrupoViagem: grupoViagemId }, { participants: arrayParticipants }, (err) => {
						if(!err) {
							res.status(201).send({message: "Participante do grupo adicionado"})
						} else {
							res.status(500).send({message: `Um erro ocorreu durante a atualização ${err}`})
						}
					})
				}
			}
		} else {
			console.log(`grupo não existe`)
		}
	}

	static getParticipantesGrupo = (req, res) => {
		participantsGrupo.find( (error, grupos) => {
			res.status(200).json(grupos);
		})
	}

	/**
	 * Verifiy if group exists
	 * @param {*} groupId
	 * @returns
	 */
	static getGroupIfExists = (groupId) => {
		return gruposViagem.findById(groupId)
	}

	/**
	 * Verify if there's some participants on choosed group
	 * @param {*} groupId
	 * @returns
	 */
	static verifyGroupParticipants = (groupId) => {
		return participantsGrupo.findOne({grupoViagemId: groupId})
	}

}

export default participantsGrupoController;
