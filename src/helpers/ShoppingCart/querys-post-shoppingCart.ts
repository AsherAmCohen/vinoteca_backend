import { database } from "../../database/database"

export const CreateShoppingCartQuery = (userId: number) => {
    return new Promise(async (resolve, reject) => {
        try {

            const existingCart = await database.shoppingCart.findFirst({
                where: {
                    userId,
                    paymendAt: null
                }
            })

            const cart = existingCart || await database.shoppingCart.create({
                data: {
                    userId
                }
            })

            resolve(cart)
        } catch (error){
            console.log(error)
            reject(false)
        }
    })
}