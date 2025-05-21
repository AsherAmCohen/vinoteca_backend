import { database } from "../../database/database"

export const RolesQuery = (props: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { skip, take } = props;
            const roles = await database.role.findMany({
                include: {
                    permissions: {
                        include: {
                            Permission: true
                        }
                    }
                },
                orderBy: {
                    id: 'desc'
                },
                skip,
                take
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

export const InfoRole = (props: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { id } = props
            const role = await database.role.findUnique({
                where: {
                    id
                }
            })

            resolve(role)
        } catch {
            reject(false)
        }
    })
}

export const RolesAllQuery = () => {
    return new Promise (async(resolve, reject) => {
        try {
            const roles = await database.role.findMany({})

            resolve(roles)
        } catch {
            reject([])
        }
    })
}