import { database } from "../../database/database"
import { CategorysQueryProps } from "../../interfaces/interface-category"

export const CategoryQuery = (data: CategorysQueryProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { skip, take } = data
            const categorys = await database.category.findMany({
                orderBy: {
                    id: 'desc'
                },
                skip,
                take
            })

            const count = await database.category.count()

            resolve({categorys: categorys, count: count})
        } catch {
            reject(false)
        }
    })
}