// import { database } from "../../database/database";

// interface updateRoleProps {
//     id: number;
//     name: string;
// }

// export const updateRoleQuery = (data: updateRoleProps) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const { id, name } = data;

//             await database.role.update({
//                 where: { Id: id },
//                 data: { Name: name }
//             });

//             resolve(true);
//         } catch (error) {
//             console.error('updateRoleQuery');
//             reject(false);
//         }
//     });
// };
