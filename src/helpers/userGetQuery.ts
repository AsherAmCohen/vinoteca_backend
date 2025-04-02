// Librerias
import { database } from "../database/database";

// Obtener los usuarios de la base de datos
export const readUsersQuery = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const Users = await database.user.findMany({})
            resolve(Users)
        } catch (error) {
            console.log('ERROR ReadUsersQuery')
            reject(false)
        }
    })
}