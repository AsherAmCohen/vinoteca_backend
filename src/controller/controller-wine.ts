import { RequestHandler } from "express";
import { StoreWineService, WineImageService, WinesService } from "../services/services-wine";

const products = [
    {
        id: 1,
        name: 'Vino',
        price: '3$'
    }, {
        id: 2,
        name: 'Licor',
        price: '3$'
    }, {
        id: 3,
        name: 'Licor',
        price: '3$'
    }
]

export const StoreWineController: RequestHandler = async (request, response) => {
    try {
        await StoreWineService(request.body)
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
        const wines = await WinesService()
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
