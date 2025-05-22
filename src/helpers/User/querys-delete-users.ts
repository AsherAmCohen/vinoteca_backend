import { database } from "../../database/database"

export const DeleteUserQuery = (props: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { id } = props
            await database.user.update({
                where: {
                    id
                },
                data: {
                    deletedAt: new Date()
                }
            })
            
            resolve (true)
        } catch {
            reject(false)
        }
    })
}