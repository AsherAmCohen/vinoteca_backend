import { database } from "../../database/database";

export const UpdateRoleQuery = (props: any) => {
    return new Promise(async(resolve, reject) => {
        try {
            const {id, roleId} = props;
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
    return new Promise(async(resolve, reject) => {
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