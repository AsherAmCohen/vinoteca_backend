import { database } from "../../database/database";

export const deletePermissionQuery = (id: number) => {
    return new Promise(async (resolve, reject) => {
        try {
            await database.permission.delete({
                where: { Id: id }
            });
            resolve(true);
        } catch (error) {
            console.error('deletePermissionQuery');
            reject(false);
        }
    });
};
