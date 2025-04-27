// import { database } from "../../database/database";

import { database } from "../../database/database";
import { StoreWineQueryProps } from "../../interfaces/interfaces-wine";

export const StoreWineQuery = (data: StoreWineQueryProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { name, description, mark, price, stock, image } = data

            await database.wine.create({
                data: {
                    name,
                    description,
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

// interface postCreadProductoProps {
//     name: string;
//     description: string;
//     price: number;
//     image: string;
//     stock: number;
//     sale: number;
// }

// export const creadProductQuery = (data: postCreadProductoProps) => {
//     return new Promise(async(resolve, reject) => {
//         try {
//             const {
//                 name,
//                 description,
//                 price,
//                 image,
//                 stock,
//                 sale
//             } = data

//             await database.product.create({
//                 data: {
//                     Name: name,
//                     Description: description,
//                     Price: price,
//                     Image: image,
//                     Stock: stock,
//                     Sale: sale
//                 }
//             })

//             resolve(true)
//         } catch (error) {
//             console.error('Error postCreadUser')
//             reject(false)
//         }
//     })
// }