import { rejects } from "assert"
import { database } from "../../database/database"
import { WinesQueryProps } from "../../interfaces/interfaces-wine"

export const WinesQuery = (props: WinesQueryProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { skip, take } = props

            const wines = await database.wine.findMany({
                orderBy: {
                    id: 'desc'
                },
                include: {
                    Mark: true,
                    Category: true
                },
                skip,
                take
            })

            const count = await database.wine.count()

            resolve({ wines: wines, count: count })
        } catch {
            reject([])
        }
    })
}

export const WinesInStockQuery = (props: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { skip, take } = props

            const wines = await database.wine.findMany({
                where: {
                    stock: {
                        not: 0
                    }
                },
                orderBy: {
                    id: 'desc'
                },
                include: {
                    Mark: true,
                    Category: true
                },
                skip,
                take
            })

            const count = await database.wine.count({
                where: {
                    stock: {
                        not: 0
                    }
                },
            })

            resolve({ wines: wines, count: count })
        } catch {
            reject([])
        }
    })
}

export const StockWineQuery = (id: number) => {
    return new Promise(async (resolve, rejects) => {
        try {
            const stock = await database.wine.findUnique({
                where: {
                    id
                }
            })

            resolve(stock?.stock || 0)
        } catch {
            rejects(0)
        }
    })
}

export const InfoWineQuery = (props: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { id } = props
            const wine = await database.wine.findUnique({
                where: {
                    id
                },
                include: {
                    Mark: true
                }
            })

            resolve(wine)
        } catch (error) {
            reject(false)
        }
    })
}