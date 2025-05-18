// userGetQuery.ts
import { database } from "../../database/database";

// Comprobar si el usuario ya existe
export const CheckEmailQuery = (email: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const EmailExists = await database.user.findUnique({
                where: {
                    email
                },
                include: {
                    shoppingCart: true
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

export const UserInformationQuery = (email: string) => {
    return new Promise(async(resolve, reject) => {
        try {
            const user = await database.user.findUnique({
                where: {
                    email
                }
            })
            
            resolve(user)
        } catch {
            reject(false)
        } 
    })
}
