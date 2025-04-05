import { database } from "../database/database"

interface creadPermisosProps {
    name: string
    description: string
}

export const creadPermisosQuery = (data: creadPermisosProps) => {
    return new Promise(async(resolve, reject) => {
        try {
            const {
                name,
                description
            } = data

            await database.permission.create({
                data: {
                    Name: name,
                    Description: description
                }
            })

            resolve(true)
        } catch (error) {
            console.error('Error creadPermisosQuery')
            reject(false)
        }
    })
}