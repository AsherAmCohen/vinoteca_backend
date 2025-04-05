"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.readProducts = exports.creadProduct = void 0;
const productPostQuery_1 = require("../helpers/product/productPostQuery");
const productGetQuery_1 = require("../helpers/product/productGetQuery");
const productPutQuery_1 = require("../helpers/product/productPutQuery");
const productDeleteQuery_1 = require("../helpers/product/productDeleteQuery");
// CRUD
// CREAD
// Crear Porductos
const creadProduct = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = request.body;
        yield (0, productPostQuery_1.creadProductQuery)(data);
        response.json('Producto creado');
    }
    catch (_a) {
        response.status(500).send({ msg: 'ERROR: No se ha creado el producto' });
    }
});
exports.creadProduct = creadProduct;
// READ
// Obtener Productos
const readProducts = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Products = yield (0, productGetQuery_1.readProductsQuery)();
        response.json(Products);
    }
    catch (_a) {
        response.status(500).send({ msg: 'ERROR: No se han obtenido los productos' });
    }
});
exports.readProducts = readProducts;
// UPDATE
const updateProduct = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = request.body;
        yield (0, productPutQuery_1.updateProductQuery)(data);
        response.json('Producto actualizado correctamente');
    }
    catch (_a) {
        response.status(500).send({ msg: 'ERROR: No se ha actualizado el producto' });
    }
});
exports.updateProduct = updateProduct;
// DELETE
const deleteProduct = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.body;
        yield (0, productDeleteQuery_1.deleteProductQuery)(id);
        response.json('El producto se ha eliminado correctamente');
    }
    catch (_a) {
        response.status(500).send({ msg: 'Error: No se ha eliminado el producto' });
    }
});
exports.deleteProduct = deleteProduct;
