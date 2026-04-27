import prisma from '../database/index';

import { Prisma } from '@prisma/client';


export const calcadoRepository = {
    createCalcado: async (data: Prisma.CalcadoCreateInput) => {
        const prod = await prisma.calcado.create({
            data: {
                nome_produto: data.nome_produto,
                cor: data.cor,
                marca: data.marca,
                tamanho: data.tamanho,
                preco: data.preco,
                quantidade_em_estoque: data.quantidade_em_estoque,
            }
        });
        return prod;
    },

    getAllCalcados: async () => {
        const prods = await prisma.calcado.findMany();
        return prods
    },

    updateCalcado: async(id: number, data: Prisma.CalcadoCreateInput) => {
        const prod = await prisma.calcado.update({
            where: {id: id},
            data: data
        })
        return prod
    },

    deleteCalcado: async(id: number) => {
        const prod = await prisma.calcado.delete({
            where: {id: id}
        })

        return prod
    }
};

