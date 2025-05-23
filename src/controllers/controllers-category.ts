import { RequestHandler } from "express";
import { CategorysAllService, CategorysService, CreateCategoryService, UpdateCategoryService } from "../services/services-category";

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

export const CategorysAllController: RequestHandler = async (request, response) => {
    try {
        const categorys = await CategorysAllService()
        response.json({
            status: 'success',
            msg: 'Lista de categorias',
            data: categorys
        })
    } catch (error: any) {
        response.status(500)
            .send({
                status: 'error',
                msg: 'Error en obtener lista de categorias por coincidencia'
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

export const UpdateCategoryController: RequestHandler = async (request, response) => {
    try {
        await UpdateCategoryService(request.body)
        response.json({
            status: 'success',
            msg: 'Categoria actualizada'
        })
    } catch (error: any) {
        response.status(500)
            .send({
                status: 'error',
                msg: error.message || 'Error al actualizar la categoria'
            })
    }
}