import { RequestHandler } from "express";
import { creadMarcaQuery } from "../helpers/mark/marcaPostQuery";

export const creadMarca: RequestHandler = async(request, response) => {
    try {
        const data = request.body;
        await creadMarcaQuery(data);
        response.json('Marca rejistrada')
    } catch {
        response.status(500).send({msg: 'ERROR: No se ha rejistrado la marca'})
    }
}