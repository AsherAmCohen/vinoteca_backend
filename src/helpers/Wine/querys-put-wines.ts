import { database } from "../../database/database"

export const UpdateWineQuery = (props: any) => {
    return new Promise(async(resolve, reject) => {
        try {
            const {id, name, description, markId, categoryId, price, stock, image} = props
            await database.wine.update({
                where: {
                    id
                },
                data: {
                    name,
                    description,
                    markId,
                    categoryId,
                    price,
                    stock,
                    image
                }
            })

            resolve(true)
        } catch {
            reject(false)
        }
    })
}

export const PaymentWine = (props: any) => {
    return new Promise(async(resolve, reject) => {
        try {
            const {id, stock, sale} = props

            await database.wine.update({
                where: {
                    id
                },
                data: {
                    stock,
                    sale
                }
            })
        } catch {
            reject(false)
        }
    })
}