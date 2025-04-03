import { RequestHandler } from "express";
import { creadProductoQuery } from "../helpers/productoPostQuery";

export const creadProducto: RequestHandler = async(request, response) => {
    try {
        const data = request.body;
        await creadProductoQuery(data);
        response.json('Role creado')
    } catch {
        response.status(500).send({msg: 'ERROR: No se ha creado el role'})
    }
}