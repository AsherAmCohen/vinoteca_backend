import { database } from "../../database/database"

export const UpdateMarkQuery = (props: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { id, name, description } = props

            await database.mark.update({
                where: {
                    id
                },
                data: {
                    name, 
                    description
                }
            })

            resolve(true)
        } catch {
            reject(false)
        }
    })
}