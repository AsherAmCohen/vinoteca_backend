// import { database } from "../../database/database";

// interface updateMarkProps {
//     id: number;
//     name: string;
//     description: string;
// }

// export const updateMarkQuery = (data: updateMarkProps) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const { id, name, description } = data;

//             await database.mark.update({
//                 where: { Id: id },
//                 data: {
//                     Name: name,
//                     Description: description
//                 }
//             });

//             resolve(true);
//         } catch (error) {
//             console.error('updateMarkQuery');
//             reject(false);
//         }
//     });
// };
