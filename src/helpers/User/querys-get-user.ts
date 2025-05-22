// userGetQuery.ts
import { database } from "../../database/database";

// Comprobar si el usuario ya existe
export const CheckEmailQuery = (email: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const EmailExists = await database.user.findUnique({
                where: {
                    email
                },
                include: {
                    shoppingCart: true,
                    Role: {
                        include: {
                            permissions: {
                                include: {
                                    Permission: true
                                }
                            }
                        }
                    }
                }
            })

            if (EmailExists) {
                resolve(EmailExists)
            } else {
                resolve(false)
            }
        } catch {
            reject(false)
        }
    })
}

export const UserInformationQuery = (email: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await database.user.findUnique({
                where: {
                    email
                }
            })

            resolve(user)
        } catch {
            reject(false)
        }
    })
}

export const UserInformationTokenQuery = (verificationToken: any) => {
    return new Promise(async(resolve, reject) => {
        try {
            const user = await database.user.findUnique({
                where: {
                    verificationToken
                }
            })
            
            resolve(user)
        } catch {
            reject(false)
        }
    })
}


export const UsersRegisterQuery = (props: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { skip, take, email } = props;
            const users = await database.user.findMany({
                where: {
                    NOT: {
                        email
                    }
                },
                include: {
                    Role: true
                },
                orderBy: {
                    createdAt: 'desc'
                },
                skip,
                take
            })

            const count = await database.user.count({
                where: {
                    NOT: {
                        email
                    }
                }
            })

            resolve({ users: users, count: count })
        } catch {
            reject(false)
        }
    })
}