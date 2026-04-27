import express from "express";
import { createCalcado, getAllCalcado, updateCalcado, deleteCalcado, getCalcadosByTamanho, getCalcadosByMarca } from "./controllers/CalcadosController";


const routes = express.Router();

// Post para criar um novo calçado
routes.post("/calcados", createCalcado)

// Get para puxar array com todos os calçados ja criados
routes.get("/calcados", getAllCalcado)

// Get para puxar calcado por tamanho
routes.get("/calcados/tamanho/:tamanho", getCalcadosByTamanho)

// Get para puxar calcado por marca
routes.get("/calcados/marca/:marca", getCalcadosByMarca)

// Put para atualizar informações de um calçados, buscando por id
routes.put("/calcados/:id", updateCalcado)

// Delete para deletar um calçado buscando por id
routes.delete("/calcados/:id", deleteCalcado)




export default routes;
