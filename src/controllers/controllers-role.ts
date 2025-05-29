import { RequestHandler } from "express";
import { CreateRoleService, PermissionsService, RolesAllService, RolesService, UpdatePermissionsRoleService } from "../services/services-role";

export const RolesController: RequestHandler = async (request, response) => {
    try {
        const roles = await RolesService(request.query);
        response.json({
            status: 'success',
            msg: 'Roles obtenidos',
            data: roles
        })
    } catch (error: any) {
        response.status(500)
            .send({
                status: 'error',
                msg: error.message || 'Obtener roles'
            })
    }
}

export const PermissionsController: RequestHandler = async (request, response) => {
    try {
        const permissions = await PermissionsService()

        response.json({
            status: 'success',
            msg: 'Permisos obtenidos',
            data: permissions
        })
    } catch (error: any) {
        response.status(500)
            .send({
                status: 'error',
                msg: error.message || 'Obtener permisos'
            })
    }
}

export const CreateRoleController: RequestHandler = async (request, response) => {
    try {
        await CreateRoleService(request.body)
        response.json({
            status: 'success',
            msg: 'Rol creado'
        })
    } catch (error: any) {
        response.status(500)
            .send({
                status: 'error',
                msg: error.message || 'Crear nuevo rol'
            })
    }
}

export const UpdatePermissionsRoleController: RequestHandler = async (request, response) => {
    try {
        await UpdatePermissionsRoleService(request.body)
        response.json({
            sttus: 'success',
            msg: 'Rol modificado'
        })
    } catch (error: any) {
        response.status(500)
            .send({
                status: 'error',
                msg: error.message || 'Modificar rol'
            })
    }
}

export const RolesAllController: RequestHandler = async (request, response) => {
    try {
        const roles = await RolesAllService()
        response.json({
            status: 'success',
            msg: 'Roles obtenidos',
            data: roles
        })
    } catch (error: any) {
        response.send({
            status: 'error',
            msg: error.messsage || 'Obtener todos los roles disponibles'
        })
    }
}