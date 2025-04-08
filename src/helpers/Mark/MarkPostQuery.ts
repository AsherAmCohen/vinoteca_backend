import { database } from "../../database/database";

interface postCreateMarkProps {
    name: string;
    description: string;
}

export const createMarkQuery = (data: postCreateMarkProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { name, description } = data;

            await database.mark.create({
                data: {
                    Name: name,
                    Description: description
                }
            });

            resolve(true);
        } catch (error) {
            console.error('Error postCreateMark');
            reject(false);
        }
    });
};
