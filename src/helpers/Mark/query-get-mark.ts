import { database } from "../../database/database"
import { MarksQueryProps, SearchMarksQueryProps } from "../../interfaces/interfaces-mark"

export const SearchMarksQuery = (props: SearchMarksQueryProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { word } = props;

            const marks = await database.mark.findMany({
                where: {
                    name: {
                        contains: word,
                    }
                }
            })
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