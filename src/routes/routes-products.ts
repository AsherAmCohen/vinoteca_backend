import { Router } from "express";
import { getProducts } from "../controller/controller-product";

const router: Router = Router();

router.get('/getProducts', getProducts)

export default router