import { RequestHandler } from "express";
import { creadShoppingcardQuery } from "../helpers/ShoppingcardPostQuery";

export const creadShoppingcard: RequestHandler = async(request, response) => {
    try {
        const data = request.body;
        await creadShoppingcardQuery(data);
        response.json('Role creado')
    } catch {
        response.status(500).send({msg: 'ERROR: No se ha creado el role'})
    }
}