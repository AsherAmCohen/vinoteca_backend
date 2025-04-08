import { database } from "../../database/database";

export const readMarkQuery = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const marks = await database.mark.findMany({});
            resolve(marks);
        } catch (error) {
            console.error('readMarkQuery');
            reject(false);
        }
    });
};
