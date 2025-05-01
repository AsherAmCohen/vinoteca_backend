import { database } from "../../database/database";
import { CreateCategoryQueryProps } from "../../interfaces/interface-category";

export const CreateCategoryQuery = (props: CreateCategoryQueryProps) => {
    return new Promise(async(resolve, reject) => {
        try {
            const {name, description} = props;

            await database.category.upsert({
                where: {
                    name,
                },
                create: {
                    name,
                    description
                },
                update: {
                    description
                }
            })
            resolve(true)
        } catch {
            reject(false)
        }
    })
}