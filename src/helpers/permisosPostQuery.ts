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

            await database.permisos.create({
                data: {
                    Name: name,
                    description: description
                }
            })

            resolve(true)
        } catch (error) {
            console.error('Error creadPermisosQuery')
            reject(false)
        }
    })
}