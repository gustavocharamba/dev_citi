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

export const updateCalcado = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;

        // 1. Converte a string da URL para número inteiro
        const calcadoId = parseInt(id, 10);

        // 2. Valida se é um número válido
        if (isNaN(calcadoId)) {
            return res.status(400).json({ message: "O ID do produto deve ser um número válido." });
        }

        // 3. Passa o NÚMERO e os DADOS para o repositório
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

        // 1. Converte a string da URL para número inteiro
        const calcadoId = parseInt(id, 10);

        // 2. Valida se é um número válido
        if (isNaN(calcadoId)) {
            return res.status(400).json({ message: "O ID do produto deve ser um número válido." });
        }

        // 3. Passa o NÚMERO para o repositório
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