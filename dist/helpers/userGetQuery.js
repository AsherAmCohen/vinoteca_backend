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
exports.readUsersQuery = void 0;
// Librerias
const database_1 = require("../database/database");
// Obtener los usuarios de la base de datos
const readUsersQuery = () => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const Users = yield database_1.database.user.findMany({});
            resolve(Users);
        }
        catch (error) {
            console.log('ERROR ReadUsersQuery');
            reject(false);
        }
    }));
};
exports.readUsersQuery = readUsersQuery;
