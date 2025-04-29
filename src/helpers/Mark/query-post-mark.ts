import { database } from "../../database/database"
import { CreateMarkQueryProps } from "../../interfaces/interfaces-mark"

export const CreateMarkQuery = (data: CreateMarkQueryProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { name, description } = data;

            const newMark = await database.mark.upsert({
                where: {
                    name
                },
                create: {
                    name,
                    description
                },
                update: {
                    description
                }
            })

            resolve(newMark)
        } catch {
            reject(false)
        }
    })
}