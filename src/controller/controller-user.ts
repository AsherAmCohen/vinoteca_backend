import { RequestHandler } from "express";
import { CreateService } from "../services/services-user";

// CREATE
export const SignUpController: RequestHandler = async (request, response) => {
    try {
        await CreateService(request.body)
        response.json({ status: 'success', msg: 'Usuario creado', data: '' })
    } catch (error: any) {
        response.status(500).send({ status: 'error', msg: error.message || 'No se ha creado el usuario', data: '' })
    }
}

// READ
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