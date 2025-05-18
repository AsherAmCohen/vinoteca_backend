import { Router } from "express";
import { AddProductShoppingCartController, AmountProductShoppingCartController, CountProductsShoppingCartController, UpdateAmountProductShoppingCartController } from "../controllers/controllers-shoppingCart";

const router: Router = Router();

router.post('/add', AddProductShoppingCartController)
router.get('/product', AmountProductShoppingCartController)
router.get('/count', CountProductsShoppingCartController)
router.put('/update', UpdateAmountProductShoppingCartController)

export default router