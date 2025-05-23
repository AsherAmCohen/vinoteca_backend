import path from "path";
import { WinesQuery } from "../helpers/Wine/querys-get-wine";
import { StoreWineQuery } from "../helpers/Wine/querys-post-wine";
import { StoreWineServiceProps, WineImageServiceProps, WinesServiceProps } from "../interfaces/interfaces-wine";
import fs from 'fs';
import { UpdateWineQuery } from "../helpers/Wine/querys-put-wines";

const formatFloat = (num: string) => {
    const format = num
        .replace(/[€\s]/g, '') // elimina € y espacios
        .replace(/\./g, '')    // elimina puntos (miles)
        .replace(',', '.');    // cambia coma por punto (decimales)

    return parseFloat(format)
}

const formatEuro = (num: number) => {
    return '€' + num
        .toFixed(2)                 // "1234.56"
        .replace('.', ',')         // "1234,56"
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // "1.234,56"
}

export const StoreWineService = async (data: StoreWineServiceProps) => {
    const { price, name, mark, category, ...rest } = data

    // Realizar las transformaciones necesarias
    const transformData = {
        ...rest,
        name: name.toUpperCase(),
        mark: Number(mark),
        category: Number(category),
        stock: Number(data.stock),
        price: formatFloat(price),
         image: `wine_image_${data.name.toUpperCase()}.jpg`
    }

    await StoreWineQuery(transformData)
}

export const WinesService = async (props: WinesServiceProps) => {
    const { page, rowsPerPage } = props

    const transformData: any = {
        skip: (Number(rowsPerPage) * (Number(page) + 1) - Number(rowsPerPage)),
        take: Number(rowsPerPage)
    }

    const { wines, count }: any = await WinesQuery(transformData)

    const allWines: any = [];

    wines.map((wine: any) => {
        const { price, Mark, markId, Category, categoryId, ...rest } = wine
        const Data = {
            ...rest,
            price: formatEuro(price),
            mark: Mark,
            category: Category
        }

        allWines.push(Data)
    })

    return ({ wines: allWines, count: count })
}

export const WineImageService = async (props: WineImageServiceProps) => {
    const { image } = props

    if (!image) {
        throw new Error('Debes de escribir el nombre de la imagen')
    }

    // Contruir el path completo
    const uploadDir = path.resolve(__dirname, '../../uploads')
    const filePath = path.join(uploadDir, image)

    if (!fs.existsSync(filePath)) {
        throw new Error('Imagen no encontrada')
    }

    return filePath
}

export const UpdateWineService = async (props: any) => {
    const { id, price, name, mark, category, description, stock } = props

    const transfromData = {
        id: parseInt(id),
        name: name.toUpperCase(),
        price: formatFloat(price),
        markId: parseInt(mark),
        categoryId: parseInt(category)
    }

    console.log(transfromData)

    await UpdateWineQuery(transfromData)

    return;
}