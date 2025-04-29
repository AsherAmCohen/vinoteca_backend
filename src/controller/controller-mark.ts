import { RequestHandler } from "express";
import { CreateMarkService, MarksService, SearchMarksService, } from "../services/services-mark";

export const CreateMarkController: RequestHandler = async (request, response) => {
    try {
        await CreateMarkService(request.body)
        response.json({
            status: 'success',
            msg: 'Marca almacenada',
            data: ''
        })
    } catch (error: any) {
        response.status(500)
            .send({
                status: 'error',
                msg: error.message || 'Error al guardar la marca'
            })
    }
}

export const SearchMarksController: RequestHandler = async (request, response) => {
    try {
        const marks = await SearchMarksService(request.query)
        response.json({
            status: 'success',
            msg: 'Lista de marcas por coincidencia',
            data: marks
        })
    } catch (error: any) {
        response.status(500)
            .send({
                status: 'error',
                msg: error.message || 'Error al buscar marca'
            })
    }
}

export const MarksController: RequestHandler = async (request, response) => {
    try {
        const marks = await MarksService(request.query)
        response.json({
            status: 'success',
            msg: 'Marcas recuperadas',
            data: marks
        })
    } catch (error: any) {
        response.status(500)
        .send({
            status: 'error',
            msg: error.message || 'Error al obtener marcas'
        })
    }
}