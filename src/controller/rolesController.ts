import { RequestHandler } from "express";
import { creadRoleQuery } from "../helpers/rolePostQuery";

export const creadRole: RequestHandler = async(request, response) => {
    try {
        const data = request.body;
        await creadRoleQuery(data);
        response.json('Role creado')
    } catch {
        response.status(500).send({msg: 'ERROR: No se ha creado el role'})
    }
}