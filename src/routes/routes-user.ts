import { Router } from "express";
import { SignInController, SignUpController, UpdateRoleController, UserInformationController, UsersRegisterController } from "../controllers/controllers-user";
import { authenticateToken } from "../middlewares/auth-middleware";
import { authorize } from "../middlewares/permission-middleware";

const router: Router = Router();

router.post('/SignUp', SignUpController)
router.post('/SignIn', SignInController)
router.get('/Information', authenticateToken, UserInformationController)
router.get('/users', authenticateToken, UsersRegisterController)
router.put('/update/role', authenticateToken, authorize(['EDIT_USER']), UpdateRoleController)

export default router