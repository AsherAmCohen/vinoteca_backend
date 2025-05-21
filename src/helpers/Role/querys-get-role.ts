import { database } from "../../database/database"

export const RolesQuery = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const roles = await database.role.findMany({
                include: {
                    permissions: {
                        include: {
                            Permission: true
                        }
                    }
                }
            })

            const count = await database.role.count()
            resolve({ roles: roles, count: count })
        } catch {
            reject(false)
        }
    })
}

export const PermissionsQuery = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const permissions = await database.permission.findMany()

            resolve(permissions)
        } catch {
            reject(false)
        }
    })
}