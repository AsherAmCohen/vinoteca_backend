import { database } from "../../database/database"
import { SignUpQueryProps } from "../../interfaces/interfaces-user"

export const SignUpQuery = (props: SignUpQueryProps) => {
    return new Promise(async(resolve, reject) => {
        try {
            const {name, lastname, gender, email, address, phone, birthdate, password} = props

            // Obtener el rol USER
            const userRole: any = await database.role.findUnique({
                where: {
                    name: 'USER'
                }
            })
            
            const user = await database.user.create({
                data: {
                    name,
                    lastname,
                    gender,
                    email,
                    address,
                    phone, 
                    birthdate,
                    password,
                    roleId: userRole.id
                }
            })
            resolve(user)
        } catch (error) {
            console.error(error)
            reject(false)
        }
    })
}