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
exports.updateProductQuery = void 0;
const database_1 = require("../database/database");
const updateProductQuery = (data) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id, name, description, price, image, stock, sale } = data;
            yield database_1.database.product.update({
                where: {
                    Id: id
                },
                data: {
                    Name: name,
                    Description: description,
                    Price: price,
                    Image: image,
                    Stock: stock,
                    Sale: sale
                }
            });
            resolve(true);
        }
        catch (error) {
            console.log('updateProductQuery');
            reject(false);
        }
    }));
};
exports.updateProductQuery = updateProductQuery;
