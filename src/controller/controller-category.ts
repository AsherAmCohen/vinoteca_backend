import { RequestHandler } from "express";
import { CategorysService, CreateCategoryService } from "../services/services-category";

export const CreateCategoryController: RequestHandler = async (request, response) => {
    try {
        await CreateCategoryService(request.body)
        response.json({
            status: 'success',
            msg: 'Categoria almacenada',
            data: ''
        })
    } catch (error: any) {
        response.status(500)
            .send({
                status: 'error',
                msg: error.message || 'Error al guardar la categoria'
            })
    }
}

export const CategorysController: RequestHandler = async (request, response) => {
    try {
        const categorys = await CategorysService(request.query)
        response.json({
            status: 'success',
            msg: 'Categorias recuperadas',
            data: categorys
        })
    } catch (error: any) {
        response.status(500)
            .send({
                status: 'error',
                msg: error.message || 'Error al obtener las categorias'
            })
    }
}