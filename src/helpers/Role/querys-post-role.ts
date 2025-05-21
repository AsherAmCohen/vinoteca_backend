import { database } from "../../database/database"

export const CreateRoleQuery = (props: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { name, description } = props;
            const role = await database.role.upsert({
                where: {
                    name,
                },
                create: {
                    name,
                    description
                },
                update: {}
            })

            resolve(role)
        } catch {
            reject(false)
        }
    })
}

export const AsignPermissionHasRoleQuery = (props: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {roleId, permissionId} = props;

            await database.permission_has_Role.upsert({
                where: {
                    roleId_permissionId: {
                        roleId,
                        permissionId
                    }
                },
                update: {},
                create: {
                    roleId,
                    permissionId
                }
            })

            resolve(true)
        } catch {
            reject(false)
        }
    })
}