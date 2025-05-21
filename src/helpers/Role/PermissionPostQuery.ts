// import { database } from "../../database/database";

// interface postCreatePermissionProps {
//     name: string;
//     description: string;
// }

// export const createPermissionQuery = (data: postCreatePermissionProps) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const { name, description } = data;

//             await database.permission.create({
//                 data: {
//                     Name: name,
//                     Description: description
//                 }
//             });

//             resolve(true);
//         } catch (error) {
//             console.error('Error postCreatePermission');
//             reject(false);
//         }
//     });
// };
