// import { database } from "../../database/database";

import { database } from "../../database/database";
import { StoreWineQueryProps } from "../../interfaces/interfaces-wine";

export const StoreWineQuery = (props: StoreWineQueryProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { name, description, mark, category, price, stock, image } = props

            await database.wine.create({
                data: {
                    name,
                    description,
                    markId: mark,
                    categoryId: category,
                    price,
                    stock,
                    image
                }
            })
            resolve(true)
        } catch (error) {
            reject(false)
        }
    })
}