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
exports.creadShoppingcardQuery = void 0;
const database_1 = require("../database/database");
const creadShoppingcardQuery = (data) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { status } = data;
            yield database_1.database.shoppingCart.create({
                data: {
                    Status: status,
                    User_Id: 1,
                }
            });
            resolve(true);
        }
        catch (error) {
            console.error('Error creadRoleQuery');
            reject(false);
        }
    }));
};
exports.creadShoppingcardQuery = creadShoppingcardQuery;
