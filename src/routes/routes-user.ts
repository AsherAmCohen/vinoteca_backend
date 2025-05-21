import { Router } from "express";
import { SignInController, SignUpController, UserInformationController, UsersRegisterController } from "../controllers/controllers-user";
import { authenticateToken } from "../middlewares/auth-middleware";

const router: Router = Router();

router.post('/SignUp', SignUpController)
router.post('/SignIn', SignInController)
router.get('/Information', authenticateToken, UserInformationController)
router.get('/users', authenticateToken, UsersRegisterController)

export default router