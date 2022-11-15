import express from "express";
import participantsGrupoController from "../controllers/participantsGruposController.js";
import auth from "../middleware/auth.js"

const router = express.Router();

router
	.post('/participante-grupo', participantsGrupoController.addParticipantGrupo)
	.get('/participantes-grupo', participantsGrupoController.getParticipantesGrupo)

export default router;
