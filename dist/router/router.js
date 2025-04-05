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
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const rolesController_1 = require("../controller/rolesController");
const productController_1 = require("../controller/productController");
const start = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        response.json({ API: 'vinoteca' });
    }
    catch (error) {
        response.json(500).send({ msg: 'ERROR' });
    }
});
const router = (0, express_1.Router)();
// Rutas
router.get('/', start);
router.post('/creadUser', userController_1.creadUser);
router.get('/readUsers', userController_1.readUsers);
router.post('/creadRole', rolesController_1.creadRole);
router.post('/creadProduct', productController_1.creadProduct);
router.get('/readProducts', productController_1.readProducts);
router.put('/updateProduct', productController_1.updateProduct);
router.delete('/deleteProduct', productController_1.deleteProduct);
module.exports = router;
