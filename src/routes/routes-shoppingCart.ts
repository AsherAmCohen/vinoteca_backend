import { Router } from "express";
import { AmountProductShoppingCartController, CountProductsShoppingCartController, UpdateAmountProductShoppingCartController } from "../controllers/controllers-shoppingCart";

const router: Router = Router();

router.get('/product', AmountProductShoppingCartController)
router.get('/count', CountProductsShoppingCartController)
router.put('/update', UpdateAmountProductShoppingCartController)

export default router