// userDeleteQuery.ts
import { database } from "../../database/database";

export const deleteUserQuery = (id: number) => {
    return new Promise(async (resolve, reject) => {
        try {
            await database.user.delete({
                where: { Id: id }
            });
            resolve(true);
        } catch (error) {
            console.error('Error in deleteUserQuery');
            reject(false);
        }
    });
};
