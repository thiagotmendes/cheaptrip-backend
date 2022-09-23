import mongoose from "mongoose";

const GrupoViagemSchema = new mongoose.Schema({
	id: {type: String},
	titulo: {type: String},
	descricao: {type: String},
	dataIda: {type: Date},
	dataVolta: {type: Date},
	qtdParticipantes: {type: Number},
	varlor: {type: String},
	idUser: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true}
},
{
	versionKey: false,
})

const gruposViagem = mongoose.model("gruposViagem", GrupoViagemSchema);
export default gruposViagem;
