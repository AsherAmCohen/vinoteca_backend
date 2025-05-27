import { RequestHandler } from "express";
import { AmountProductShoppingCartService, CountProductsShoppingCartService, PaymentShoppingCartService, ShoppingCartPaymentAllService, ShoppingCartUserService, UpdateAmountProductShoppingCartService, WinesShoppingCartService } from "../services/services-shoppingCart";
import { request } from "http";

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

export const WinesShoppingCartController: RequestHandler = async (request, response) => {
    try {
        const wines = await WinesShoppingCartService(request.query)
        response.json({
            status: 'success',
            msg: 'Productos almacenados en el carrito',
            data: wines
        })
    } catch (error: any) {
        response.status(500)
        .send({
            status: 'error',
            msg: error.message || 'Error al obtener vinos almacenado en el carrito'
        })
    }
}

export const PaymentShoppingCartController: RequestHandler = async (request, response) => {
    try {
        await PaymentShoppingCartService(request.body)
        response.json({
            status: 'success',
            msg: 'Carrito pagato',
        })
    } catch (error: any) {
        response.status(500)
        .send({
            status: 'error',
            msg: error.message || 'Error al realizar la compra de los productos'
        })
    }
}

export const ShoppingCartPaymentAllController: RequestHandler = async (request, response) => {
    try {
        await ShoppingCartPaymentAllService(request.query)
        response.json({
            status: 'success',
            msg: 'Compras Obtenidas'
        })
    } catch (error: any) {
        response.status(500)
        .send({
            status: 'error',
            msg: error.message || 'Error al obtener las compras'
        })
    }
}

export const ShoppingCartUserController: RequestHandler = async(request, response) => {
    try {
        const shoppingCart = await ShoppingCartUserService(request.query)
        response.json({
            status: 'success',
            msg: 'Carrito obtenido',
            data: shoppingCart
        })
    } catch (error: any) {
        response.status(500)
        .send({
            status: 'error',
            msg: error.message || 'Error al obtener el carrito libre del usuario'
        })
    }
}