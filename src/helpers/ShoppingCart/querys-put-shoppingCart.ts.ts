import { database } from "../../database/database"

export const UpdateAmountProductShoppingCartQuery = (props: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { wineId, shoppingCartId, amount } = props;
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
        } catch {
            reject(false)
        }
    })
}