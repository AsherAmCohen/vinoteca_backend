import { RequestHandler } from "express";
import { PermissionsService, RolesService } from "../services/services-role";

export const RolesController: RequestHandler = async (request, response) => {
    try {
        const roles = await RolesService();
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

export const PermissionsController: RequestHandler = async(request, response) => {
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

export const CreateRoleController: RequestHandler = async(request, response) => {
    try {
        console.log(request.body)
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