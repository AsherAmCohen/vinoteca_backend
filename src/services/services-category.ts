import { CategoryQuery, CategorysAllQuery } from "../helpers/Category/querys-get-category";
import { CreateCategoryQuery } from "../helpers/Category/querys-post-category";
import { CategorysServiceProps } from "../interfaces/interfaces-category";
import { CreateMarkQueryProps } from "../interfaces/interfaces-mark";

export const CreateCategoryService = async (props: CreateMarkQueryProps) => {
    const { name, ...rest } = props

    const transformData = {
        ...rest,
        name: name.trim().toUpperCase()
    }

    await CreateCategoryQuery(transformData)
}

export const CategorysAllService = async () => {
    const categorys = await CategorysAllQuery()
    
    return categorys
}

export const CategorysService = async (props: CategorysServiceProps) => {
    const { page, rowsPerPage } = props;

    const transformData: any = {
        skip:  (Number(rowsPerPage) * (Number(page) + 1) - Number(rowsPerPage)),
        take: Number(rowsPerPage)
    }

    const categorys = await CategoryQuery(transformData)

    return categorys
}