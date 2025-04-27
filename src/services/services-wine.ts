import path from "path";
import { WinesQuery } from "../helpers/Wine/query-get-wine";
import { StoreWineQuery } from "../helpers/Wine/query-post-wine";
import { StoreWineServiceProps, WineImageServiceProps } from "../interfaces/interfaces-wine";
import fs from 'fs';

function formatEuro(num: number) {
    return '€' + num
        .toFixed(2)                 // "1234.56"
        .replace('.', ',')         // "1234,56"
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // "1.234,56"
}


export async function StoreWineService(data: StoreWineServiceProps) {
    let { price, ...rest } = data

    // Cambiar el formato del precio
    price = price
        .replace(/[€\s]/g, '') // elimina € y espacios
        .replace(/\./g, '')    // elimina puntos (miles)
        .replace(',', '.');    // cambia coma por punto (decimales)

    const floatPrice = parseFloat(price)

    // Realizar las transformaciones necesarias
    const transformData = {
        ...rest,
        name: data.name.toUpperCase(),
        stock: Number(data.stock)
    }

    await StoreWineQuery({
        ...transformData,
        price: floatPrice,
        image: `wine_image_${data.name.toUpperCase()}.jpg`
    })
}

export async function WinesService() {
    const wines: any = await WinesQuery()

    const allWines: any = [];

    wines.map((wine: any) => {
        const { price, ...rest } = wine
        const Data = {
            ...rest,
            price: formatEuro(price)
        }

        allWines.push(Data)
    })

    return (allWines)
}

export async function WineImageService(props: WineImageServiceProps) {
    const { image } = props

    if (!image) {
        throw new Error('Debes de escribir el nombre de la imagen')
    }

    // Contruir el path completo
    const uploadDir = path.resolve(__dirname, '../../uploads')
    const filePath = path.join(uploadDir, image)

    if(!fs.existsSync(filePath)) {
        throw new Error('Imagen no encontrada')
    }

    return filePath
}