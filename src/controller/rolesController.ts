import { RequestHandler } from "express";
import { creadRolesQuery } from "../helpers/rolesPostQuery";
import { readRolesQuery } from "../helpers/rolesGetQuery";

export const creadRoles: RequestHandler = async(request, response) => {
    try {
        const data = request.body;
        await creadRolesQuery(data);
        response.json('Role creado')
    } catch {
        response.status(500).send({msg: 'ERROR: No se ha creado el role'})
    }
}

// READ
// Obtener usuarios
export const readRoles: RequestHandler = async (request, response) => {
    try {
        const roles = await readRolesQuery();
        response.json(roles);
    } catch {
        response.status(500).send({ msg: 'ERROR: NO SE PUEDEN RECUPERAR LOS ROLES' });
    }
}
