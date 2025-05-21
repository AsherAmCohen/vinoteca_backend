import { PermissionsQuery, RolesQuery } from "../helpers/Role/querys-get-role";

export const RolesService = async() => {
    const {roles, count}: any = await RolesQuery()

    const AllRoles: any = [];

    roles.map((role: any) => {
        // Permisos
        const permissions = role.permissions.map((p: any) => ({name: p.Permission.name, description: p.Permission.description}))

        const Data = {
            name: role.name,
            description: role.description,
            permissions: permissions
        }

        AllRoles.push(Data)
    })

    return ({roles: AllRoles, count: count})
}

export const PermissionsService = async() => {
    const permissions = await PermissionsQuery()
    return permissions
}