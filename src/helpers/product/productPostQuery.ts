import { database } from "../../database/database";

interface postCreadProductoProps {
    name: string;
    description: string;
    price: number;
    image: string;
    stock: number;
    sale: number;
}

export const creadProductQuery = (data: postCreadProductoProps) => {
    return new Promise(async(resolve, reject) => {
        try {
            const {
                name,
                description,
                price,
                image,
                stock,
                sale
            } = data

            await database.product.create({
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
            console.error('Error postCreadUser')
            reject(false)
        }
    })
}