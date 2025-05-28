import { RequestHandler } from "express";
import { InfoWineService, StoreWineService, UpdateWineService, WineImageService, WinesInStockService, WinesService } from "../services/services-wine";

export const StoreWineController: RequestHandler = async (request, response) => {
    try {
        await StoreWineService(request.body, request.file?.originalname)
        response.json({
            status: 'success',
            msg: 'Vino almacenado',
            data: ''
        })
    } catch (error: any) {
        response.status(500)
            .send({
                status: 'error',
                msg: error.message || 'No se ha almacenado el vino',
                data: ''
            })
    }
}

export const WinesController: RequestHandler = async (request, response) => {
    try {
        const wines = await WinesService(request.query)
        response.json({
            status: 'success',
            msg: 'Lista de vinos',
            data: wines
        })
    } catch (error: any) {
        response.status(500)
            .send({
                status: 'error',
                msg: error.message || 'No se han obtenidos los vinos almacenados'
            })
    }
}

export const WinesInStockController: RequestHandler = async (request, response) => {
    try {
        const wines = await WinesInStockService(request.query)
        response.json({
            status: 'success',
            msg: 'Lista de vinos en stock',
            data: wines
        })
    } catch (error: any) {
        response.status(500)
            .send({
                sttus: 'error',
                msg: error.message || 'No se han obtenido los vinos con stock'
            })
    }
}

export const WineImageController: RequestHandler = async (request, response) => {
    try {
        const image = await WineImageService(request.query)
        response.sendFile(image)
    } catch (error: any) {
        response.status(500)
            .send({
                status: 'error',
                msg: error.message || 'No se ha recuperado la imagen del vino'
            })
    }
}

export const UpdateWineController: RequestHandler = async (request, response) => {
    try {
        await UpdateWineService(request.body)
        response.json({
            staus: 'success',
            msg: 'Vino actualizado'
        })
    } catch (error: any) {
        response.status(500)
            .send({
                status: 'error',
                msg: error.message || 'No se actualizo el vino'
            })
    }
}

export const InfoWineController: RequestHandler = async (request, response) => {
    try {
        const wine = await InfoWineService(request.query)
        response.json({
            status: 'success',
            msg: 'Información del vino',
            data: wine
        })
    } catch (error: any) {
        response.status(500)
            .send({
                status: 'error',
                msg: error.message || 'No se ha obtenido información del vino'
            })
    }
}