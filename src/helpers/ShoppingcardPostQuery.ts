import { database } from "../database/database"

interface creadShoppingcardProps {
    status: string
}

export const creadShoppingcardQuery = (data: creadShoppingcardProps) => {
    return new Promise(async(resolve, reject) => {
        try {
            const {
                status
            } = data

            await database.Shoppingcard.create({
                data: {
                    status: status
                }
            })

            resolve(true)
        } catch (error) {
            console.error('Error creadRoleQuery')
            reject(false)
        }
    })
}