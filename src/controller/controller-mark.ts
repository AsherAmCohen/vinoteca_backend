import { RequestHandler } from "express";
import { MarksService } from "../services/services-mark";

export const MarksController: RequestHandler = async (request, response) => {
    try {
        const marks = await MarksService(request.query)
        response.json({
            status: 'success',
            msg: 'Lista de marcas por coincidencia',
            data: marks
        })
    } catch (error: any){
        response.status(500)
        .send({
            status: 'error',
            msg: error.message || 'Error al obtener las marcas'
        })
    }
}