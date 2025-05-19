import { RequestHandler } from "express";
import { AmountProductShoppingCartService, CountProductsShoppingCartService, UpdateAmountProductShoppingCartService } from "../services/services-shoppingCart";

export const AmountProductShoppingCartController: RequestHandler = async (request, response) => {
    try {
        const amount = await AmountProductShoppingCartService(request.query)
        response.json({
            status: 'success',
            msg: 'Cantidad de vino almacenada en el carrito obtenida',
            data: amount
        })
    } catch (error: any) {
        response.status(500)
            .send({
                status: 'error',
                msg: error.message || 'Error al obtener información del vino en el carrito'
            })
    }
}

export const UpdateAmountProductShoppingCartController: RequestHandler = async (request, response) => {
    try {
        await UpdateAmountProductShoppingCartService(request.body)
        response.json({
            status: 'success',
            msg: 'Cantidad de vino almacenada en el carrito obtenida',
        })
    }
    catch (error: any) {
        response.status(500)
            .send({
                status: 'error',
                msg: error.message || 'Al actualizar la cantidad de productos'
            })
    }
}
export const CountProductsShoppingCartController: RequestHandler = async (request, response) => {
    try {
        const count = await CountProductsShoppingCartService(request.query)
        response.json({
            status: 'success',
            msg: 'cantidad de productos almacenados en el carrito',
            data: count
        })
    }
    catch (error: any) {
        response.status(500)
            .send({
                status: 'error',
                msg: error.message || 'Al obtener cantidad de productos en el carrito'
            })
    }
}