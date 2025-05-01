import { MarksQuery, SearchMarksQuery } from "../helpers/Mark/query-get-mark";
import { CreateMarkQuery } from "../helpers/Mark/query-post-mark";
import { CreateMarkServiceProps, MarksServiceProps, SearchMarksServiceProps } from "../interfaces/interfaces-mark";

export const CreateMarkService = async (props: CreateMarkServiceProps) => {
    const { name, ...rest } = props

    const transformData = {
        ...rest,
        name: name.trim().toUpperCase()
    }

    await CreateMarkQuery(transformData)
}

export const SearchMarksService = async (props: SearchMarksServiceProps) => {
    const { word } = props

    const transformData = {
        word: word ? word.toUpperCase() : ''
    }

    const marks = await SearchMarksQuery(transformData);

    return marks
}

export const MarksService = async (props: MarksServiceProps) => {
    const { page, rowsPerPage } = props;

    const transformData: any = {
        skip: (Number(rowsPerPage) * (Number(page) + 1) - Number(rowsPerPage)),
        take: Number(rowsPerPage)
    }

    const marks = await MarksQuery(transformData)

    return marks
}