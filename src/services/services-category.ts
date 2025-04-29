import { CategoryQuery } from "../helpers/Category/query-get-category";
import { CreateCategoryQuery } from "../helpers/Category/query-post-category";
import { CategorysServiceProps } from "../interfaces/interface-category";
import { CreateMarkQueryProps } from "../interfaces/interfaces-mark";

export const CreateCategoryService = async (data: CreateMarkQueryProps) => {
    const { name, ...rest } = data

    const transformData = {
        ...rest,
        name: name.trim().toUpperCase()
    }

    await CreateCategoryQuery(transformData)
}

export const CategorysService = async (data: CategorysServiceProps) => {
    const { page, rowsPerPage } = data;

    const transformData: any = {
        skip:  (Number(rowsPerPage) * (Number(page) + 1) - Number(rowsPerPage)),
        take: Number(rowsPerPage)
    }

    const categorys = await CategoryQuery(transformData)

    return categorys
}