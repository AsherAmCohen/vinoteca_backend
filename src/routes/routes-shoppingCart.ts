import { Router } from "express";
import { AmountProductShoppingCartController, CountProductsShoppingCartController, UpdateAmountProductShoppingCartController, WinesShoppingCartController } from "../controllers/controllers-shoppingCart";

const router: Router = Router();

router.get('/product', AmountProductShoppingCartController)
router.get('/count', CountProductsShoppingCartController)
router.put('/update', UpdateAmountProductShoppingCartController)
router.get('/wines', WinesShoppingCartController)

export default router