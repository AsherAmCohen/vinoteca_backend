import { Router } from "express";
import { AmountProductShoppingCartController, CountProductsShoppingCartController, PaymentShoppingCartController, ShoppingCartPaymentAllController, ShoppingCartUserController, UpdateAmountProductShoppingCartController, WinesShoppingCartController } from "../controllers/controllers-shoppingCart";

const router: Router = Router();

router.get('/product', AmountProductShoppingCartController)
router.get('/count', CountProductsShoppingCartController)
router.put('/update', UpdateAmountProductShoppingCartController)
router.get('/wines', WinesShoppingCartController)
router.put('/payment', PaymentShoppingCartController)
router.get('/shopping', ShoppingCartPaymentAllController)
router.get('/user', ShoppingCartUserController)

export default router