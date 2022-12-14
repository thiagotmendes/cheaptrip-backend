import express from "express";
import GruposViagemController from "../controllers/grupoViagemController.js";
import auth from "../middleware/auth.js"

const router = express.Router();

router
	.get("/grupos-viagem", GruposViagemController.getGruposViagem)
	.get("/grupos-viagem/:id", GruposViagemController.getGrupoViagemById)
	.get("/grupos-viagem/user_id/:user_id", GruposViagemController.getGrupoViagemByUserId)
	.post('/grupos-viagem', auth, GruposViagemController.saveGrouposViagem)
	.put('/grupos-viagem/update/:id', GruposViagemController.updateGrupoViagem)
	.delete("/grupos-viagem/:id", GruposViagemController.deleteGrupoViagem)

export default router;
