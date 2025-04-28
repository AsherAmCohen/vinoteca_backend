import { MarksQuery } from "../helpers/Mark/query-get-mark"
import { CreateMarkQuery } from "../helpers/Mark/query-post-mark";
import { CreateMarkServiceProps, MarksServiceProps } from "../interfaces/interfaces-mark";

export const MarksService = async (data: MarksServiceProps) => {
    const { word } = data

    const transformData = {
        word: word ? word.toUpperCase() : ''
    }

    const maks = await MarksQuery(transformData);

    return maks
}

export const CreateMarkService = async (data: CreateMarkServiceProps) => {
    const { mark } = data

    const transformData = {
        mark: mark.toUpperCase()
    }

    const newMark = await CreateMarkQuery(transformData)

    return newMark
}