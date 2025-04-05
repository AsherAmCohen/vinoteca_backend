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
exports.creadPermiso = void 0;
const permisosPostQuery_1 = require("../helpers/permisosPostQuery");
const creadPermiso = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = request.body;
        yield (0, permisosPostQuery_1.creadPermisosQuery)(data);
        response.json('Permiso concebido');
    }
    catch (_a) {
        response.status(500).send({ msg: 'ERROR: No se ha dado permiso' });
    }
});
exports.creadPermiso = creadPermiso;
