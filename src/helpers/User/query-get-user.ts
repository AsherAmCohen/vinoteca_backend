// userGetQuery.ts
import { database } from "../../database/database";

// Comprobar si el usuario ya existe
export const CheckEmailQuery = (email: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const EmailExists = await database.user.findUnique({
                where: {
                    Email: email
                }
            })

            if (EmailExists) {
                resolve(EmailExists)
            } else {
                resolve(false)
            }
        } catch {
            reject(false)
        }
    })
}

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

