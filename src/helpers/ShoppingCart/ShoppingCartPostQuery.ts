// import { database } from "../../database/database";

// interface postCreateShoppingCartProps {
//     userId: number;
// }

// export const createShoppingCartQuery = (data: postCreateShoppingCartProps) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const { userId } = data;

//             await database.shoppingCart.create({
//                 data: {
//                     User_Id: userId
//                 }
//             });

//             resolve(true);
//         } catch (error) {
//             console.error('Error postCreateShoppingCart');
//             reject(false);
//         }
//     });
// };
