import { database } from "../../database/database";

interface updateShoppingCartProps {
    id: number;
    status: 'active' | 'abandoned' | 'completed';
}

export const updateShoppingCartQuery = (data: updateShoppingCartProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { id, status } = data;

            await database.shoppingCart.update({
                where: { Id: id },
                data: { Status: status }
            });

            resolve(true);
        } catch (error) {
            console.error('updateShoppingCartQuery');
            reject(false);
        }
    });
};
