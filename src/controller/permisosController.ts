import { RequestHandler } from "express";
import { creadPermisosQuery } from "../helpers/permisosPostQuery";

export const creadPermiso: RequestHandler = async(request, response) => {
    try {
        const data = request.body;
        await creadPermisosQuery(data);
        response.json('Permiso concebido')
    } catch {
        response.status(500).send({msg: 'ERROR: No se ha dado permiso'})
    }
}