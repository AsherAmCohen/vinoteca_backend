import { DeletePermissionsHasRole } from "../helpers/Role/querys-delete-role";
import { InfoRole, PermissionsQuery, RolesQuery } from "../helpers/Role/querys-get-role";
import { AsignPermissionHasRoleQuery, CreateRoleQuery } from "../helpers/Role/querys-post-role";

export const RolesService = async (props: any) => {
    const { page, rowsPerPage } = props

    const transformData: any = {
        skip: (Number(rowsPerPage) * (Number(page) + 1) - Number(rowsPerPage)),
        take: Number(rowsPerPage),
    }
    const { roles, count }: any = await RolesQuery(transformData)

    const AllRoles: any = [];

    roles.map((role: any) => {
        // Permisos
        const permissions = role.permissions.map((p: any) => ({ id: p.Permission.id, name: p.Permission.name, description: p.Permission.description }))

        const Data = {
            id: role.id,
            name: role.name,
            description: role.description,
            permissions: permissions
        }

        AllRoles.push(Data)
    })

    return ({ roles: AllRoles, count: count })
}

export const PermissionsService = async () => {
    const permissions = await PermissionsQuery()
    return permissions
}

export const CreateRoleService = async (props: any) => {
    const { name, description, permissions } = props

    const transformData = {
        name: name.toUpperCase(),
        description: description,
    }

    // Crear el rol
    const role: any = await CreateRoleQuery(transformData)

    // Asignar los permisos al rol
    await Promise.all(
        permissions.map((permission: any) =>
            AsignPermissionHasRoleQuery({ roleId: role.id, permissionId: permission.id })
        )
    )

    console.log(role)

    return;
}

export const UpdatePermissionsRoleService = async (props: any) => {
    const {roleId, permissions} = props

    const transformData = {
        id: parseInt(roleId)
    }
    
    const role: any = await InfoRole(transformData)

    // Eliminar todos los permisos actuales
    await DeletePermissionsHasRole({roleId: role.id})

    // Volver a asignar los permisos
    await Promise.all(
        permissions.map((permission: any) =>
            AsignPermissionHasRoleQuery({ roleId: role.id, permissionId: permission.id })
        )
    )

    return;
}