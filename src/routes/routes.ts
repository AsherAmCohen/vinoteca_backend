import { Router } from "express";
import RoutesUser from './routes-user'
import RouterWine from './routes-wines'
import RouterMark from './routes-mark'
import RouterCategory from './routes-category'
import RouterShoppingCart from './routes-shoppingCart'

const router: Router = Router()

router.get('/', (_resquest, response) => {
    try {
        response.json({api: 'Vinoteca', status: 'success'})
    } catch {
        response.status(500).send({api: 'Vinoteca', status: 'error'})
    }
})


router.use('/user', RoutesUser)
router.use('/wine', RouterWine)
router.use('/mark', RouterMark)
router.use('/category', RouterCategory)
router.use('/shoppingCart', RouterShoppingCart)

module.exports = router;
