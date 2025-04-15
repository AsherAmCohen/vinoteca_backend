// import { RequestHandler } from "express";
// import { creadShoppingcardQuery } from "../helpers/ShoppingcardPostQuery";
// // import { readShoppingcardQuery } from "../helpers/ShoppingcardGetQuery";

// export const creadShoppingcard: RequestHandler = async(request, response) => {
//     try {
//         const data = request.body;
//         await creadShoppingcardQuery(data);
//         response.json('Role creado')
//     } catch {
//         response.status(500).send({msg: 'ERROR: No se ha creado el role'})
//     }
// }

// // READ
// // Obtener usuarios
// export const readShoppingcard: RequestHandler = async (request, response) => {
//     try {
//         // const shoppingcards = await readShoppingcardQuery();
//         // response.json(shoppingcards);
//     } catch {
//         response.status(500).send({ msg: 'ERROR: NO SE PUEDEN RECUPERAR LOS CARRITOS' });
//     }
// }