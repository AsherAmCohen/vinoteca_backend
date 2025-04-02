// Librerias
import { RequestHandler } from "express";
import { postCreadUser } from "../helpers/userPostQuery";
import { readUsersQuery } from "../helpers/userGetQuery";

// CREAD
// Creación de usuarios
export const creadUser: RequestHandler = async (request, response) => {
    try {
        const data = request.body
        await postCreadUser(data);
        response.json('Ok')
    } catch {
        response.status(500).send({msg: 'ERROR: NO SE HA CREADO EL USUARIO'})
    }
}

// READ
// Obtener usuarios
export const readUsers: RequestHandler = async (request, response) => {
    try {
        const users = await readUsersQuery();
        response.json(users)
    } catch {
        response.status(500).send({msg: 'ERROR: NO SE PUEDEN RECUPERAR LOS USUARIOS'})
    }
}

// UPDATE

// DELETE