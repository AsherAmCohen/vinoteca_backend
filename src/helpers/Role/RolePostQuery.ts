// import { database } from "../../database/database";

// interface postCreateRoleProps {
//     name: string;
// }

// export const createRoleQuery = (data: postCreateRoleProps) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const { name } = data;

//             await database.role.create({
//                 data: { Name: name }
//             });

//             resolve(true);
//         } catch (error) {
//             console.error('Error postCreateRole');
//             reject(false);
//         }
//     });
// };
