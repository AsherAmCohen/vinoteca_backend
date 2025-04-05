import { database } from "../../database/database"

export const readProductsQuery = () => {
    return new Promise(async(resolve, reject) => {
        try {
            const Produts = await database.product.findMany({})
            resolve(Produts)
        } catch (error) {
            console.error('readProductQuery')
            reject(false)
        }
    })
}