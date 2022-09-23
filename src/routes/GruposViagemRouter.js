import express from "express";
import GruposViagemController from "../controllers/grupoViagemController.js";

const router = express.Router();

router
	.get("/grupos-viagem", GruposViagemController.getGruposViagem)
	.get("/grupos-viagem/:id", GruposViagemController.getGrupoViagemById)
	.post('/grupos-viagem/save', GruposViagemController.saveGrouposViagem)
	.put('/grupos-viagem/update/:id', GruposViagemController.updateGrupoViagem)
	.delete("/grupos-viagem/delete/:id", GruposViagemController.deleteGrupoViagem)

export default router;
