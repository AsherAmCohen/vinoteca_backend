import { database } from "../../database/database";

export const UpdateCategoryQuery = (props: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { id, name, description } = props;

            await database.category.update({
                where: {
                    id
                },
                data: {
                    name,
                    description
                }
            })
            resolve(true)
        } catch {
            reject(false)
        }
    })
}