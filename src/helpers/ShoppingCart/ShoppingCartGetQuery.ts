import { database } from "../../database/database";

export const readShoppingCartQuery = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const shoppingCarts = await database.shoppingCart.findMany({});
            resolve(shoppingCarts);
        } catch (error) {
            console.error('readShoppingCartQuery');
            reject(false);
        }
    });
};
