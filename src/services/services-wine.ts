import path from "path";
import { InfoWineQuery, WinesInStockQuery, WinesQuery } from "../helpers/Wine/querys-get-wine";
import { StoreWineQuery } from "../helpers/Wine/querys-post-wine";
import { StoreWineServiceProps, WineImageServiceProps, WinesServiceProps } from "../interfaces/interfaces-wine";
import fs from 'fs';
import { UpdateWineQuery } from "../helpers/Wine/querys-put-wines";
import { skip } from "@prisma/client/runtime/library";

const formatFloat = (num: string) => {
    const format = num
        .replace(/[€\s]/g, '') // elimina € y espacios
        .replace(/\./g, '')    // elimina puntos (miles)
        .replace(',', '.');    // cambia coma por punto (decimales)

    return parseFloat(format)
}

export const formatEuro = (num: number) => {
    return '€' + num
        .toFixed(2)                 // "1234.56"
        .replace('.', ',')         // "1234,56"
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // "1.234,56"
}

export const StoreWineService = async (data: StoreWineServiceProps, image: any) => {
    const { name, description, mark, category, price, stock } = data

    // Realizar las transformaciones necesarias
    const transformData = {
        name: name.toUpperCase(),
        description: description,
        markId: Number(mark),
        categoryId: Number(category),
        stock: Number(stock),
        price: formatFloat(price),
        image: image
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

export const WinesInStockService = async (props: any) => {
    const { page, rowsPerPage } = props

    const transformData: any = {
        skip: (Number(rowsPerPage) * (Number(page)) - Number(rowsPerPage)),
        take: Number(rowsPerPage)
    }

    const { wines, count }: any = await WinesInStockQuery(transformData)

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
    const { id, price, name, mark, category, description, stock, image } = props

    const transformData = {
        id: parseInt(id),
        name: name.toUpperCase(),
        description: description,
        markId: parseInt(mark),
        categoryId: parseInt(category),
        price: formatFloat(price),
        stock: parseInt(stock),
        image: image
    }

    await UpdateWineQuery(transformData)

    return;
}

export const InfoWineService = async (props: any) => {
    const { id, amount } = props

    const transformData = {
        id: parseInt(id)
    }

    const wine: any = await InfoWineQuery(transformData)

    const dataWine = {
        id: wine.id,
        name: wine.name,
        price: wine.price,
        image: wine.image,
        mark: wine.Mark.name,
        stock: wine.stock,
        totalPrice: (wine.price * amount)
    }

    return dataWine
}