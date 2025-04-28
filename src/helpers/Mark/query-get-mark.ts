import { database } from "../../database/database"
import { MarksQueryProps } from "../../interfaces/interfaces-mark"

export const MarksQuery = (data: MarksQueryProps) => {
    return new Promise(async(resolve, reject) => {
        try {
            const {word} = data;
            
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