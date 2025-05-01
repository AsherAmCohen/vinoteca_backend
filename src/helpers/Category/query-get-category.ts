import { database } from "../../database/database"
import { CategorysQueryProps, SearchCategorysQueryProps } from "../../interfaces/interface-category"

export const SearchCategorysQuery = (props: SearchCategorysQueryProps) => {
    return new Promise(async(resolve, reject) => {
        try {
            const {word} = props;

            const categorys = await database.category.findMany({
                where: {
                    name: {
                        contains: word,
                    }
                }
            })

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