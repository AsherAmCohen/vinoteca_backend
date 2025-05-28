import { Router } from "express";
import { AmountProductShoppingCartController, CountProductsShoppingCartController, PaymentShoppingCartController, ShoppingCartPaymentAllController, ShoppingCartUserController, UpdateAmountProductShoppingCartController, WinesShoppingCartController } from "../controllers/controllers-shoppingCart";
import { authorize } from "../middlewares/permission-middleware";

const router: Router = Router();

router.get('/product', AmountProductShoppingCartController)
router.get('/count', CountProductsShoppingCartController)
router.put('/update', UpdateAmountProductShoppingCartController)
router.get('/wines', WinesShoppingCartController)
router.put('/payment', authorize(['PAYMENT']), PaymentShoppingCartController)
router.get('/shopping', authorize(['VIEW_ORDER']), ShoppingCartPaymentAllController)
router.get('/user', ShoppingCartUserController)

export default router