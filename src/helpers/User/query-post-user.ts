import { database } from "../../database/database"
import { SignUpQueryProps } from "../../interfaces/interfaces-user"

export const SignUpQuery = (data: SignUpQueryProps) => {
    return new Promise(async(resolve, reject) => {
        try {
            console.log(data)
            const {name, lastname, gender, email, address, phone, birthdate, password} = data
            
            await database.user.create({
                data: {
                    Name: name,
                    Lastname: lastname,
                    Gender: gender,
                    Email: email,
                    Address: address,
                    Phone: phone, 
                    Birhdate: birthdate,
                    Password: password
                }
            })
            resolve(true)
        } catch (error) {
            console.error(error)
            reject(false)
        }
    })
}
// // userPostQuery.ts
// import { database } from "../../database/database";

// interface postCreateUserProps {
//     name: string;
//     lastname: string;
//     password: string;
//     gender: string;
//     email: string;
//     address: string;
//     phone: string;
//     birthdate: string;
//     roleId: number;
// }

// export const postCreadUser = (data: postCreateUserProps) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const {
//                 name,
//                 lastname,
//                 password,
//                 gender,
//                 email,
//                 address,
//                 phone,
//                 birthdate,
//                 roleId
//             } = data;

//             await database.user.create({
//                 data: {
//                     Name: name,
//                     Lastname: lastname,
//                     Password: password,
//                     Gender: gender,
//                     Email: email,
//                     Address: address,
//                     Phone: phone,
//                     Birthdate: birthdate,
//                     Role_Id: roleId
//                 }
//             });

//             resolve(true);
//         } catch (error) {
//             console.error('Error in postCreadUser');
//             reject(false);
//         }
//     });
// };
