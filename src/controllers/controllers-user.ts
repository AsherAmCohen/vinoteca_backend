import { RequestHandler } from "express";
import { ChangePasswordService, ChangeUserDataService, DeleteUserService, SignInService, SignUpService, UpdateRoleService, UserInformationService, UsersRegisterService, VerifiedUserService } from "../services/services-user";

export const SignUpController: RequestHandler = async (request, response) => {
    try {
        await SignUpService(request.body)
        response.json({
            status: 'success',
            msg: 'Usuario creado',
            data: ''
        })
    } catch (error: any) {
        response.status(500)
            .send({
                status: 'error',
                msg: error.message || 'No se ha creado el usuario',
                data: ''
            })
    }
}

export const SignInController: RequestHandler = async (request, response) => {
    try {
        const user = await SignInService(request.body)
        response.json({
            status: 'success',
            msg: 'Usuario existente',
            data: user
        })
    } catch (error: any) {
        response.status(500)
            .send({
                status: 'error',
                msg: error.message || 'No se ha podido iniciar sesión, vuelve a intentarlo mas tarde',
                data: ''
            })
    }
}

export const UserInformationController: RequestHandler = async (request, response) => {
    try {
        const user = await UserInformationService(request.query)
        response.json({
            status: 'success',
            msg: 'Información obtenida',
            data: user
        })
    } catch (error: any) {
        response.status(500)
            .send({
                status: 'error',
                msg: error.message || 'No se ha podido obtener la información del usuario',
            })
    }
}

export const UsersRegisterController: RequestHandler = async (request, response) => {
    try {
        const users = await UsersRegisterService(request.query)
        response.json({
            status: 'success',
            msg: 'Información obtenida',
            data: users
        })
    } catch (error: any) {
        response.status(500)
            .send({
                status: 'error',
                msg: error.message || 'No se han obtenidos los usuarios registrados',
            })
    }
}

export const UpdateRoleController: RequestHandler = async (request, response) => {
    try {
        await UpdateRoleService(request.body)
        response.json({
            status: 'success',
            msg: 'Actualizar información del usuario'
        })
    } catch (error: any) {
        response.status(500)
            .send({
                status: 'error',
                msg: error.message || 'No se ha actualizado el rol'
            })
    }
}

export const DeleteUserController: RequestHandler = async (request, response) => {
    try {
        await DeleteUserService(request.body)
        response.json({
            status: 'success',
            msg: 'Usuario eliminado'
        })
    } catch (error: any) {
        response.status(500)
            .send({
                status: 'error',
                msg: error.message || 'No se ha eliminado el usuario'
            })
    }
}

export const VerifiedUserController: RequestHandler = async (request, response) => {
    try {
        await VerifiedUserService(request.body)
        response.json({
            status: 'success',
            msg: 'Se ah validado el usuario'
        })
    } catch (error: any) {
        response.status(500)
            .send({
                status: 'error',
                msg: error.message || 'No se ha verificado el usuario'
            })
    }
}

export const ChangePasswordController: RequestHandler = async (request, response) => {
    try {
        await ChangePasswordService(request.body)
        response.json({
            status: 'success',
            msg: 'Se ha cambiado la contraseña'
        })
    } catch (error: any) {
        response.status(500)
            .send({
                status: 'error',
                msg: error.message || 'No se ha cambiado la contraseña'
            })
    }
}

export const ChangeUserDataController: RequestHandler = async (request, response) => {
    try {
        await ChangeUserDataService(request.body)
        response.json({
            status: 'success',
            msg: 'Se ha actualizado los datos'
        })
    } catch (error: any) {
        response.status(500)
            .send({
                status: 'error',
                msg: error.message || 'No se ha cambiado la información'
            })
    }
}