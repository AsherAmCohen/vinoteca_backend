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
exports.postCreadUser = void 0;
const database_1 = require("../database/database");
const postCreadUser = (data) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, lastname, password, email, address, gender, phone, birtdate } = data;
            yield database_1.database.user.create({
                data: {
                    Name: name,
                    Lastname: lastname,
                    Password: password,
                    Email: email,
                    Address: address,
                    Gender: gender,
                    Phone: phone,
                    Birthdate: new Date(birtdate),
                    Role_Id: 1
                }
            });
            resolve(true);
        }
        catch (error) {
            console.error('Error postCreadUser');
            reject(false);
        }
    }));
};
exports.postCreadUser = postCreadUser;
