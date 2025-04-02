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
exports.readUsers = exports.creadUser = void 0;
const userPostQuery_1 = require("../helpers/userPostQuery");
const userGetQuery_1 = require("../helpers/userGetQuery");
// CREAD
// Creación de usuarios
const creadUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = request.body;
        yield (0, userPostQuery_1.postCreadUser)(data);
        response.json('Ok');
    }
    catch (_a) {
        response.status(500).send({ msg: 'ERROR: NO SE HA CREADO EL USUARIO' });
    }
});
exports.creadUser = creadUser;
// READ
// Obtener usuarios
const readUsers = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userGetQuery_1.readUsersQuery)();
        response.json(users);
    }
    catch (_a) {
        response.status(500).send({ msg: 'ERROR: NO SE PUEDEN RECUPERAR LOS USUARIOS' });
    }
});
exports.readUsers = readUsers;
// UPDATE
// DELETE
