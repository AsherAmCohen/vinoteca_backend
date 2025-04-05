import { database } from "../../database/database"

export const deleteProductQuery = (id: number) => {
    return new Promise(async(resolve, reject) => {
        try {
            await database.product.delete({
                where: {Id: id}
            })
            resolve(true)
        } catch (error) {
            console.error('deleteProductQuery')
            reject(false)
        }
    })
}