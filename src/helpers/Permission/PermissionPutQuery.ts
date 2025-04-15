// import { database } from "../../database/database";

// interface updatePermissionProps {
//     id: number;
//     name: string;
//     description: string;
// }

// export const updatePermissionQuery = (data: updatePermissionProps) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const { id, name, description } = data;

//             await database.permission.update({
//                 where: { Id: id },
//                 data: {
//                     Name: name,
//                     Description: description
//                 }
//             });

//             resolve(true);
//         } catch (error) {
//             console.error('updatePermissionQuery');
//             reject(false);
//         }
//     });
// };
