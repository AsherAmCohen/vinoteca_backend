import { database } from "../../database/database"

export const UpdateAmountProductShoppingCartQuery = (props: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { wineId, shoppingCartId, amount } = props;
            await database.wines_has_ShoppingCard.update({
                where: {
                    wineId,
                    shoppingCartId
                },
                data: {
                    amount
                }
            })

            resolve(true)
        } catch {
            reject(false)
        }
    })
}