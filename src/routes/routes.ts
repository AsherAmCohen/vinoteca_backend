import { Router } from "express";
import RoutesUser from './routes-user'
import RouterWine from './routes-wines'
import RouterMark from './routes-mark'
import RouterCategory from './routes-category'
import RouterShoppingCart from './routes-shoppingCart'
import RouterRole from './routes-role'
import { verifyInternalApiKey } from "../middlewares/internal-api-key";
import { authenticateToken } from "../middlewares/auth-middleware";

const router: Router = Router()

router.get('/', (_resquest, response) => {
    try {
        response.json({ api: 'Vinoteca', status: 'success' })
    } catch {
        response.status(500).send({ api: 'Vinoteca', status: 'error' })
    }
})


router.use('/user', verifyInternalApiKey, RoutesUser)
router.use('/wine', verifyInternalApiKey, authenticateToken, RouterWine)
router.use('/mark', verifyInternalApiKey, authenticateToken, RouterMark)
router.use('/category', verifyInternalApiKey, authenticateToken, RouterCategory)
router.use('/shoppingCart', verifyInternalApiKey, authenticateToken, RouterShoppingCart)
router.use('/role', verifyInternalApiKey, authenticateToken, RouterRole)

module.exports = router;
