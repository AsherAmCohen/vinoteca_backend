import { database } from "../../database/database"

export const AmountProductShoppingCartQuery = (props: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { wineId, shoppingCartId } = props
            const product = await database.wines_has_ShoppingCard.findUnique({
                where: {
                    wineId,
                    shoppingCartId
                }
            })

            resolve(product?.amount || 0)
        } catch {
            reject(false)
        }
    })
}

export const CountProductsShoppingCartQuery = (props: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { shoppingCartId } = props

            const shoppingCart = await database.wines_has_ShoppingCard.findMany({
                where: {
                    shoppingCartId
                }
            })

            resolve(shoppingCart)
        } catch {
            reject(false)
        }
    })
}

export const WinesShoppingCartQuery = (props: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { shoppingCartId } = props

            const wines = await database.wines_has_ShoppingCard.findMany({
                where: {
                    shoppingCartId
                },
                include: {
                    wine: {
                        include: {
                            Mark: true
                        }
                    }
                }
            })

            resolve(wines)
        } catch {
            reject([])
        }
    })
}

export const ShoppingCartPaymentAllQuery = (props: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { email } = props

            const orders = await database.user.findUnique({
                where: {
                    email
                },
                include: {
                    shoppingCart: true
                }
            })

            resolve(orders)
        } catch {
            reject([])
        }
    })
}

export const ShoppingCartUserQuery = (props: any) => {
    return new Promise(async(resolve, reject) => {
        try {
            const {email} = props;
            
            const shoppingCart = await database.shoppingCart.findFirst({
                where: {
                    paymendAt: null,
                    User: {
                        email
                    }
                },
                include: {
                    User: true
                }
            })

            resolve(shoppingCart)
        } catch {
            reject(false)
        }
    })
}