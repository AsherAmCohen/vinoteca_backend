import { database } from "../../database/database"

export const UpdateWineQuery = (props: any) => {
    return new Promise(async(resolve, reject) => {
        try {
            const {id, name, price, markId, categoryId} = props
            await database.wine.update({
                where: {
                    id
                },
                data: {
                    name,
                    price,
                    markId,
                    categoryId
                }
            })
        } catch {
            reject(false)
        }
    })
}