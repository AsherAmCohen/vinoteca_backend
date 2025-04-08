import { RequestHandler } from "express";
import { creadPermisosQuery } from "../helpers/permisosPostQuery";
import { readPermisosQuery } from "../helpers/permisosGetQuery";

export const creadPermiso: RequestHandler = async(request, response) => {
    try {
        const data = request.body;
        await creadPermisosQuery(data);
        response.json('Permiso concebido')
    } catch {
        response.status(500).send({msg: 'ERROR: No se ha dado permiso'})
    }
}

// READ
// Obtener usuarios
export const readPermisos: RequestHandler = async (request, response) => {
    try {
        const permisos = await readPermisosQuery();
        response.json(permisos);
    } catch {
        response.status(500).send({ msg: 'ERROR: NO SE PUEDEN RECUPERAR LOS PERMISOS' });
    }
}