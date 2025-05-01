import { database } from "../../database/database"
import { WinesQueryProps } from "../../interfaces/interfaces-wine"

export const WinesQuery = (props: WinesQueryProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { skip, take } = props

            const wines = await database.wine.findMany({
                orderBy: {
                    id: 'desc'
                },
                include: {
                    Mark: true,
                    Category: true
                },
                skip,
                take
            })

            const count = await database.wine.count()

            resolve({wines: wines, count: count})
        } catch {
            reject([])
        }
    })
}