import { Router } from "express";
import RoutesUser from './routes-user'
import RouterWine from './routes-wines'
import RouterMark from './routes-mark'

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

module.exports = router;
