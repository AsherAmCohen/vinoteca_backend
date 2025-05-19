import { database } from "../../database/database"

export const CreateShoppingCartQuery = (userId: number) => {
    return new Promise(async (resolve, reject) => {
        try {
            await database.shoppingCart.create({
                data: {
                    userId
                }
            })
        } catch {
            reject(false)
        }
    })
}