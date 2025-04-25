import { RequestHandler } from "express";
import { SignInService, SignUpService, UserInformationService } from "../services/services-user";

export const SignUpController: RequestHandler = async (request, response) => {
    try {
        await SignUpService(request.body)
        response.json({ status: 'success', msg: 'Usuario creado', data: '' })
    } catch (error: any) {
        response.status(500).send({ status: 'error', msg: error.message || 'No se ha creado el usuario', data: '' })
    }
}

export const SignInController: RequestHandler = async (request, response) => {
    try {
        const user = await SignInService(request.body)
        response.json({ status: 'success', msg: 'Usuario existente', data: user })
    } catch (error: any) {
        response.status(500).send({ status: 'error', msg: error.message || 'No se ha podido iniciar sesión, vuelve a intentarlo mas tarde', data: '' })
    }
}

export const UserInformationController: RequestHandler = async (request, response) => {
    try {
        const user = await UserInformationService(request.query)
        response.json({ status: 'success', msg: 'Información obtenida', data: user })
    } catch (error: any) {
        response.status(500).send({ status: 'error', msg: error.message || 'No se ha podido obtener la información del usuario', data: '' })
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