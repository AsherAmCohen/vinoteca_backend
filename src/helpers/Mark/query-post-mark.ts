import { database } from "../../database/database"
import { CreateMarkQueryProps } from "../../interfaces/interfaces-mark"

export const CreateMarkQuery = (data: CreateMarkQueryProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { mark } = data;

            const newMark = await database.mark.upsert({
                where: {
                    name: mark
                },
                create: {
                    name: mark
                },
                update: {}
            })

            resolve(newMark)
        } catch {
            reject(false)
        }
    })
}