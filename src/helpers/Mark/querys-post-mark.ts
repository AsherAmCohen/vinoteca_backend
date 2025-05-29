import { database } from "../../database/database"
import { CreateMarkQueryProps } from "../../interfaces/interfaces-mark"

export const CreateMarkQuery = (props: CreateMarkQueryProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { name, description } = props;

            await database.mark.upsert({
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

            resolve(true)
        } catch {
            reject(false)
        }
    })
}