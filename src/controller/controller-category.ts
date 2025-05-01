import { RequestHandler } from "express";
import { CategorysService, CreateCategoryService, SearchCategorysService } from "../services/services-category";

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

export const searchCategorysController: RequestHandler = async (request, response) => {
    try {
        const categorys = await SearchCategorysService(request.query)
        response.json({
            status: 'success',
            msg: 'Lista de categorias por coincidencia',
            data: categorys
        })
    } catch (error: any) {
        response.status(500)
            .send({
                status: 'success',
                msg: 'Lista de categorias por coincidencia'
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