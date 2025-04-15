import { RequestHandler } from "express";
import { CreateQuery } from "../helpers/User/query-post-user";
import { CheckEmailQuery } from "../helpers/User/query-get-user";
import bcrypt from 'bcrypt';
import { CreateService } from "../services/services-user";

// CREATE
export const CreateController: RequestHandler = async (request, response) => {
    try {
        await CreateService(request.body)
        response.json({ status: 'success', msg: 'Usuario creado', data: '' })
    } catch (error: any) {
        response.status(500).send({ status: 'error', msg: error.message || 'No se ha creado el usuario', data: '' })
    }
}

// // READ
// // // Obtener usuarios
// // export const readUsers: RequestHandler = async (request, response) => {
// //     try {
// //         const users = await readUsersQuery();
// //         response.json(users)
// //     } catch {
// //         response.status(500).send({msg: 'ERROR: NO SE PUEDEN RECUPERAR LOS USUARIOS'})
// //     }
// // }

// // UPDATE

// // DELETE