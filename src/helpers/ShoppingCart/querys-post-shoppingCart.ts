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

export const AddProductShoppingCartQuery = (props: any) => {
    return new Promise(async (resolve, reject) => {
        try {            
            const {wineId, shoppingCartId} = props
            await database.wines_has_ShoppingCard.upsert({
                where: {
                    wineId,
                    shoppingCartId,
                },
                create: {
                    wineId,
                    shoppingCartId,
                },
                update: {}
            })

            resolve (true)
        } catch (error){
            console.log(error)
            reject(false)
        }
    })
}