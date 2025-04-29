import { database } from "../../database/database"
import { MarksQueryProps, SearchMarksQueryProps } from "../../interfaces/interfaces-mark"

export const SearchMarksQuery = (data: SearchMarksQueryProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { word } = data;

            const marks = await database.mark.findMany({
                where: {
                    name: {
                        contains: word,
                    }
                }
            })
            resolve(marks)
        } catch {
            reject(false)
        }
    })
}

export const MarksQuery = (data: MarksQueryProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {skip, take} = data
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
            reject(false)
        }
    })
}