import { database } from "../../database/database"

export const UpdateAmountProductShoppingCartQuery = (props: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { wineId, shoppingCartId, amount } = props;
            console.log(props)
            await database.wines_has_ShoppingCard.upsert({
                where: {
                    wineId,
                    shoppingCartId
                },
                create: {
                    wineId,
                    shoppingCartId,
                    amount
                },
                update: {
                    amount
                }
            })

            resolve(true)
        } catch (error) {
            console.log(error)
            reject(false)
        }
    })
}

export const PaymentShoppingCartQuery = (props: any) => {
    return new Promise(async(resolve, reject) => {
        try {
            const {id} = props
            
            const cart = await database.shoppingCart.update({
                where: {
                    id
                },
                data: {
                    paymendAt: new Date()
                }
            })

            resolve(cart)
        } catch (error) {
            reject(false)
        }
    })
}