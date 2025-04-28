import { database } from "../../database/database"

export const WinesQuery = () => {
    return new Promise(async(resolve, reject) => {
        try {
            const wines = database.wine.findMany({
                orderBy: {
                    id: 'desc'
                },
                include: {
                    Mark: true
                }
            })
            resolve(wines)
        } catch {
            reject(false)
        }
    })
}