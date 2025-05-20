import { Router } from "express";
import { SignInController, SignUpController, UserInformationController, UsersRegisterAllController } from "../controllers/controllers-user";

const router: Router = Router();

router.post('/SignUp', SignUpController)
router.post('/SignIn', SignInController)
router.get('/Information', UserInformationController)
router.get('/all', UsersRegisterAllController)

export default router