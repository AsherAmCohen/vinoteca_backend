import { MarksQuery, SearchMarksQuery } from "../helpers/Mark/query-get-mark";
import { CreateMarkQuery } from "../helpers/Mark/query-post-mark";
import { CreateMarkServiceProps, MarksServiceProps, SearchMarksServiceProps } from "../interfaces/interfaces-mark";

export const CreateMarkService = async (data: CreateMarkServiceProps) => {
    const { name, ...rest } = data

    const transformData = {
        ...rest,
        name: name.trim().toUpperCase()
    }
    
    await CreateMarkQuery(transformData)
}

export const SearchMarksService = async (data: SearchMarksServiceProps) => {
    const { word } = data

    const transformData = {
        word: word ? word.toUpperCase() : ''
    }

    const marks = await SearchMarksQuery(transformData);

    return marks
}

export const MarksService = async (data: MarksServiceProps) => {
    const { page, rowsPerPage } = data;

    const transformData: any = {
        skip:  (Number(rowsPerPage) * (Number(page) + 1) - Number(rowsPerPage)),
        take: Number(rowsPerPage)
    }

    const marks = await MarksQuery(transformData)

    return marks
}