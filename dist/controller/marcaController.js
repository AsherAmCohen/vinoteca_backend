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
exports.creadMarca = void 0;
const marcaPostQuery_1 = require("../helpers/mark/marcaPostQuery");
const creadMarca = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = request.body;
        yield (0, marcaPostQuery_1.creadMarcaQuery)(data);
        response.json('Marca rejistrada');
    }
    catch (_a) {
        response.status(500).send({ msg: 'ERROR: No se ha rejistrado la marca' });
    }
});
exports.creadMarca = creadMarca;
