import { Router } from "express";
import { CreateRoleController, PermissionsController, RolesController } from "../controllers/controllers-role";

const router: Router = Router();

router.get('/roles', RolesController)
router.get('/permissions', PermissionsController)
router.post('/create', CreateRoleController)

export default router