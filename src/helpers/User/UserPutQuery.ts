// userPutQuery.ts
import { database } from "../../database/database";

interface updateUserProps {
    id: number;
    name: string;
    lastname: string;
    password: string;
    gender: string;
    email: string;
    address: string;
    phone: string;
    birthdate: string;
    roleId: number;
}

export const updateUserQuery = (data: updateUserProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                id,
                name,
                lastname,
                password,
                gender,
                email,
                address,
                phone,
                birthdate,
                roleId
            } = data;

            await database.user.update({
                where: {
                    Id: id
                },
                data: {
                    Name: name,
                    Lastname: lastname,
                    Password: password,
                    Gender: gender,
                    Email: email,
                    Address: address,
                    Phone: phone,
                    Birthdate: birthdate,
                    Role_Id: roleId
                }
            });

            resolve(true);
        } catch (error) {
            console.error('Error in updateUserQuery');
            reject(false);
        }
    });
};
