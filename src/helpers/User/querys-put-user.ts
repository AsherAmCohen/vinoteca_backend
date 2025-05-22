import { database } from "../../database/database";

export const UpdateRoleQuery = (props: any) => {
    return new Promise(async(resolve, reject) => {
        try {
            const {id, roleId} = props;
            await database.user.update({
                where: {
                    id
                },
                data: {
                    roleId
                }
            })
            resolve(true)
        } catch {
            reject(false)
        }
    })
}