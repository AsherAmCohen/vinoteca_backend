// userGetQuery.ts
import { database } from "../../database/database";

export const readUsersQuery = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await database.user.findMany({});
            resolve(users);
        } catch (error) {
            console.error('Error in readUsersQuery');
            reject(false);
        }
    });
};
