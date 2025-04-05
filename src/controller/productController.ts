import { RequestHandler, response } from "express";
import { creadProductQuery } from "../helpers/product/productPostQuery";
import { readProductsQuery } from "../helpers/product/productGetQuery";
import { updateProductQuery } from "../helpers/product/productPutQuery";
import { deleteProductQuery } from "../helpers/product/productDeleteQuery";

// CRUD

// CREAD
// Crear Porductos
export const creadProduct: RequestHandler = async(request, response) => {
    try {
        const data = request.body;
        await creadProductQuery(data);
        response.json('Producto creado')
    } catch {
        response.status(500).send({msg: 'ERROR: No se ha creado el producto'})
    }
}

// READ
// Obtener Productos
export const readProducts: RequestHandler = async(request, response) => {
    try {
        const Products = await readProductsQuery()
        response.json(Products)
    } catch {
        response.status(500).send({msg: 'ERROR: No se han obtenido los productos'})
    }
}

// UPDATE
export const updateProduct: RequestHandler = async(request, response) => {
    try {
        const data = request.body;
        await updateProductQuery(data)
        response.json('Producto actualizado correctamente')
    } catch {
        response.status(500).send({msg: 'ERROR: No se ha actualizado el producto'})
    }
}

// DELETE
export const deleteProduct: RequestHandler = async(request, response) => {
    try {
        const {id} = request.body
        await deleteProductQuery(id)
        response.json('El producto se ha eliminado correctamente')
    } catch {
        response.status(500).send({msg: 'Error: No se ha eliminado el producto'})
    }
}