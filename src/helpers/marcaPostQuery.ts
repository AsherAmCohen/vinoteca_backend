import { database } from "../database/database"

interface creadMarcaProps {
    name: string
    description: string
}

export const creadMarcaQuery = (data: creadMarcaProps) => {
    return new Promise(async(resolve, reject) => {
        try {
            const {
                name,
                description
            } = data

            await database.marca.create({
                data: {
                    Name: name,
                    description: description
                }
            })

            resolve(true)
        } catch (error) {
            console.error('Error creadMarcaQuery')
            reject(false)
        }
    })
}