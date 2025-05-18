import { database } from "../../database/database"
import { SignUpQueryProps } from "../../interfaces/interfaces-user"

export const SignUpQuery = (props: SignUpQueryProps) => {
    return new Promise(async(resolve, reject) => {
        try {
            const {name, lastname, gender, email, address, phone, birthdate, password} = props
            
            const user = await database.user.create({
                data: {
                    name,
                    lastname,
                    gender,
                    email,
                    address,
                    phone, 
                    birthdate,
                    password
                }
            })
            resolve(user)
        } catch (error) {
            console.error(error)
            reject(false)
        }
    })
}