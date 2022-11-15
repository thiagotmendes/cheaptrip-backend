import mongoose from "mongoose";

const ParticipantsGrupo = new mongoose.Schema({
	id: {type: String},
	idGrupoViagem: {type: String},
	participants: [{ userId: String, userName: String }]
}, {
	versionKey: false
})

const participantsGrupo = mongoose.model("participantsGrupo", ParticipantsGrupo);
export default participantsGrupo;
