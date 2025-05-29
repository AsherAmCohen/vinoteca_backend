import { database } from "../../database/database"

export const DeletePermissionsHasRole = (props: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { roleId } = props

            await database.permission_has_Role.deleteMany({
                where: {
                    roleId
                }
            })

            resolve(true)
        } catch {
            reject(false)
        }
    })
}