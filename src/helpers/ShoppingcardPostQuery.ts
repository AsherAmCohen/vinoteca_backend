// import { database } from "../database/database"

// interface creadShoppingcardProps {
//     status: any
// }

// export const creadShoppingcardQuery = (data: creadShoppingcardProps) => {
//     return new Promise(async(resolve, reject) => {
//         try {
//             const {
//                 status
//             } = data

//             await database.shoppingCart.create({
//                 data: {
//                     Status: status,
//                     User_Id: 1,
//                 }
//             })

//             resolve(true)
//         } catch (error) {
//             console.error('Error creadRoleQuery')
//             reject(false)
//         }
//     })
// }