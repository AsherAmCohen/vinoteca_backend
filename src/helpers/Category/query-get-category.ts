import { database } from "../../database/database"
import { CategorysQueryProps } from "../../interfaces/interface-category"

export const CategorysAllQuery = () => {
    return new Promise(async(resolve, reject) => {
        try {
            const categorys = await database.category.findMany()
            resolve(categorys)
        } catch {
            reject([])
        }
    })
}

export const CategoryQuery = (props: CategorysQueryProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { skip, take } = props
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
            reject([])
        }
    })
}