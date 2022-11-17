import mongoose from "mongoose";

const GrupoViagemSchema = new mongoose.Schema({
	id: {type: String},
	title: {type: String},
	destination: {type: String},
	description: {type: String},
	imageAddress: {type: String},
	departureDate: {type: Date},
	returnDate: {type: Date},
	qtdParticipants: {type: Number},
	price: {type: Number},
	idUser: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true} /** to refer the group owner */
},
{
	versionKey: false,
})

const gruposViagem = mongoose.model("gruposViagem", GrupoViagemSchema);
export default gruposViagem;
