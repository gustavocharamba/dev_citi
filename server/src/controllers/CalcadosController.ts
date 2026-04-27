import { Request, Response } from "express";
import { calcadoRepository } from "../repositorie/CalcadoRepositorie";

export const createCalcado = async (req: Request, res: Response) => {
    try {
        const { nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque } = req.body;

        if (!nome_produto || !cor || !marca || !tamanho || !preco || !quantidade_em_estoque) {
            return res.status(400).json({
                message: "Preencha todos os dados obrigatórios."
            });
        }

        const newProd = await calcadoRepository.createCalcado({
            nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque
        });

        return res.status(201).json({
            message: "Produto adicionado com sucesso!",
            data: newProd
        });

    } catch (error) {
        return res.status(500).json({ error });
    }
};

export const getAllCalcado = async (req: Request, res: Response) => {
    try {
        const calcados = await calcadoRepository.getAllCalcados();

        if (calcados.length === 0) {
            return res.status(404).json({
                message: "Nenhum produto adicionado."
            });
        }

        return res.status(200).json(calcados);

    } catch (error) {
        return res.status(400).json({
            message: "Erro ao buscar produto.",
            error,
        });
    }
};

export const getCalcadosByTamanho = async (req: Request, res: Response) => {
    try {

        const { tamanho } = req.params;

        const tamanhoNum = parseInt(tamanho, 10);

        if (isNaN(tamanhoNum)) {
            return res.status(400).json({ message: "O tamanho deve ser um número válido." });
        }

        const calcados = await calcadoRepository.getCalcadoByTamanho(tamanhoNum);

        if (calcados.length === 0) {
            return res.status(404).json({
                message: "Nenhum calçado encontrado com este tamanho."
            });
        }

        return res.status(200).json(calcados);

    } catch (error) {
        return res.status(500).json({
            message: "Erro ao buscar calçados por tamanho.",
            error
        });
    }
};

export const updateCalcado = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const calcadoId = parseInt(id, 10);

        if (isNaN(calcadoId)) {
            return res.status(400).json({ message: "O ID do produto deve ser um número válido." });
        }

        const updatedCalcado = await calcadoRepository.updateCalcado(calcadoId, data);

        return res.status(200).json({
            message: "Produto atualizado com sucesso!",
            data: updatedCalcado
        });

    } catch (error) {
        return res.status(500).json({
            message: "Erro ao atualizar o produto.",
            error
        });
    }
};

export const deleteCalcado = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const calcadoId = parseInt(id, 10);

        if (isNaN(calcadoId)) {
            return res.status(400).json({ message: "O ID do produto deve ser um número válido." });
        }

        await calcadoRepository.deleteCalcado(calcadoId);

        return res.status(200).json({
            message: "Produto deletado com sucesso!"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Erro ao deletar o produto.",
            error
        });
    }
};