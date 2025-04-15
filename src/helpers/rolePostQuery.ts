// import { database } from "../database/database"

// interface creadRoleProps {
//     name: string
// }

// export const creadRoleQuery = (data: creadRoleProps) => {
//     return new Promise(async(resolve, reject) => {
//         try {
//             const {
//                 name
//             } = data

//             await database.role.create({
//                 data: {
//                     Name: name
//                 }
//             })

//             resolve(true)
//         } catch (error) {
//             console.error('Error creadRoleQuery')
//             reject(false)
//         }
//     })
// }