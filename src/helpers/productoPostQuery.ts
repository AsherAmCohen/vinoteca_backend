import { database } from "../database/database";

interface postCreadProductoProps {
    name: string;
    description: string;
    image: string;
    stock: string;
}

export const creadProductoQuery = (data: postCreadProductoProps) => {
    return new Promise(async(resolve, reject) => {
        try {
            const {
                name,
                description,
                image,
                stock
            } = data

            await database.producto.create({
                data: {
                    Name: name,
                    description: description,
                    image: image,
                    stock: stock,
                }
            })

            resolve(true)
        } catch (error) {
            console.error('Error postCreadUser')
            reject(false)
        }
    })
}