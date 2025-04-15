// import { database } from "../database/database";

// interface postCreadUserProps {
//     name: string;
//     lastname: string;
//     password: string;
//     email: string;
//     address: string;
//     gender: string;
//     phone: string;
//     birtdate: string;
// }

// export const postCreadUser = (data: postCreadUserProps) => {
//     return new Promise(async(resolve, reject) => {
//         try {
//             const {
//                 name,
//                 lastname,
//                 password,
//                 email,
//                 address,
//                 gender,
//                 phone,
//                 birtdate
//             } = data

//             await database.user.create({
//                 data: {
//                     Name: name,
//                     Lastname: lastname,
//                     Password: password,
//                     Email: email,
//                     Address: address,
//                     Gender: gender,
//                     Phone: phone,
//                     Birthdate: new Date(birtdate),
//                     Role_Id: 1
//                 }
//             })

//             resolve(true)
//         } catch (error) {
//             console.error('Error postCreadUser')
//             reject(false)
//         }
//     })
// }