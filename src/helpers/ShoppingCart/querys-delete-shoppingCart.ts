import { database } from "../../database/database";

export const DeleteProductoShoppingCartQuery = (props: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { wineId, shoppingCartId } = props;
            await database.wines_has_ShoppingCard.delete({
                where: {
                    wineId_shoppingCartId: {
                        wineId,
                        shoppingCartId
                    }
                }
            })

            resolve(true)
        } catch {
            reject(false)
        }
    })
}