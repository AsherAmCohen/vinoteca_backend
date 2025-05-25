import { ChangePasswordController } from "../../controllers/controllers-user";
import { database } from "../../database/database";

export const UpdateRoleQuery = (props: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { id, roleId } = props;
            await database.user.update({
                where: {
                    id
                },
                data: {
                    roleId
                }
            })
            resolve(true)
        } catch {
            reject(false)
        }
    })
}

export const VerifiedUserQuery = (verificationToken: string, roleId: number) => {
    return new Promise(async (resolve, reject) => {
        try {
            await database.user.update({
                where: {
                    verificationToken
                },
                data: {
                    verifiedAt: new Date(),
                    roleId
                }
            })

            resolve(true)
        } catch {
            reject(false)
        }
    })
}

export const ChangePasswordQuery = (props: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, password } = props
            await database.user.update({
                where: {
                    email
                },
                data: {
                    password
                }
            })

            resolve(true)
        } catch {
            reject(false)
        }
    })
}

export const ChangeUserDataQuery = (props: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, name, lastname, phone, address } = props
            await database.user.update({
                where: {
                    email
                },
                data: {
                    name,
                    lastname,
                    phone,
                    address
                }
            })
            
            resolve(true)
        } catch (error){
            console.log(error)
            reject(false)
        }
    })
}