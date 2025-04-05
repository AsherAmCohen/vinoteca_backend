import { database } from "../../database/database"

interface updateProductProps {
    id: number
    name: string,
    description: string,
    price: number
    image: string,
    stock: number,
    sale: number
}

export const updateProductQuery = (data: updateProductProps) => {
    return new Promise(async(resolve, reject) => {
        try {
            const {
                id,
                name,
                description,
                price,
                image,
                stock,
                sale
            } = data
            await database.product.update({
                where: {
                    Id: id
                },
                data: {
                    Name: name,
                    Description: description,
                    Price: price,
                    Image: image,
                    Stock: stock,
                    Sale: sale
                }
            })
            resolve(true)
        } catch (error) {
            console.log('updateProductQuery')
            reject(false)
        }
    })
}