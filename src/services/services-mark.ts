import { MarksAllQuery, MarksQuery } from "../helpers/Mark/querys-get-mark";
import { CreateMarkQuery } from "../helpers/Mark/querys-post-mark";
import { UpdateMarkQuery } from "../helpers/Mark/querys-put-marks";
import { CreateMarkServiceProps, MarksServiceProps } from "../interfaces/interfaces-mark";

export const CreateMarkService = async (props: CreateMarkServiceProps) => {
    const { name, ...rest } = props

    const transformData = {
        ...rest,
        name: name.trim().toUpperCase()
    }

    await CreateMarkQuery(transformData)
}

export const MarksAllService = async () => {
    const marks: any = await MarksAllQuery();

    const allMarks: any = []

    marks.map((mark: any) => {
        const Data = {
            id: mark.id,
            name: mark.name
        }
        allMarks.push(Data)
    })

    return allMarks
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

export const UpdateMarkService = async (props: any) => {
    const {id, name, description} = props;

    if(!id) {
        throw new Error('No existe id')
    }

    if(!name) {
        throw new Error('No existe nombre')
    }

    if(!description) {
        throw new Error('No existe descripción')
    }

    const transformData = {
        id: parseInt(id),
        name: name.toUpperCase(),
        description: description
    }

    await UpdateMarkQuery(transformData)

    return;
}