import { database } from "../../database/database"
import { MarksQueryProps } from "../../interfaces/interfaces-mark"

export const MarksAllQuery = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const marks = await database.mark.findMany()
            resolve(marks)
        } catch {
            reject([])
        }
    })
}

export const MarksQuery = (props: MarksQueryProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {skip, take} = props
            const marks = await database.mark.findMany(
                {
                    orderBy: {
                        id: 'desc'
                    },
                    skip,
                    take
                }
            )

            const count = await database.mark.count()

            resolve({marks: marks, count: count})
        } catch {
            reject([])
        }
    })
}