import { RequestHandler } from "express";
import { CreateMarkService, MarksAllService, MarksService, UpdateMarkService, } from "../services/services-mark";

export const CreateMarkController: RequestHandler = async (request, response) => {
    try {
        await CreateMarkService(request.body)
        response.json({
            status: 'success',
            msg: 'Marca almacenada',
        })
    } catch (error: any) {
        response.status(500)
            .send({
                status: 'error',
                msg: error.message || 'Error al guardar la marca'
            })
    }
}

export const MarksAllController: RequestHandler = async (request, response) => {
    try {
        const marks = await MarksAllService()
        response.json({
            status: 'success',
            msg: 'Lista de todas las marcas',
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

export const UpdateMarkController: RequestHandler = async (request, response) => {
    try {
        await UpdateMarkService(request.body)
        response.json({
            ststus: 'success',
            msg: 'Marca actualizada'
        })

    } catch (error: any) {
        response.status(500)
        .send({
            status: 'error',
            msg: error.message || 'Error al actualizar la marca'
        })
    }
}