import { RequestHandler } from "express";
import { creadMarkQuery, readMarkQuery } from "../helpers/markQuery";

// CREATE
export const creadMark: RequestHandler = async (request, response) => {
    try {
        const data = request.body;
        await creadMarkQuery(data);
        response.json('Marca rejistrada');
    } catch {
        response.status(500).send({ msg: 'ERROR: No se ha rejistrado la marca' });
    }
}

// READ
export const readMark: RequestHandler = async (request, response) => {
    try {
        const marcas = await readMarkQuery();
        response.json(marcas);
    } catch {
        response.status(500).send({ msg: 'ERROR: NO SE PUEDEN RECUPERAR LAS MARCAS' });
    }
}