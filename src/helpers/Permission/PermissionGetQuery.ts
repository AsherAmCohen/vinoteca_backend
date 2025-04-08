import { database } from "../../database/database";

export const readPermissionQuery = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const permissions = await database.permission.findMany({});
            resolve(permissions);
        } catch (error) {
            console.error('readPermissionQuery');
            reject(false);
        }
    });
};
