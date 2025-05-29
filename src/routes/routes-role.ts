import { Router } from "express";
import { CreateRoleController, PermissionsController, RolesAllController, RolesController, UpdatePermissionsRoleController } from "../controllers/controllers-role";
import { authorize } from "../middlewares/permission-middleware";

const router: Router = Router();

router.get('/roles', authorize(['VIEW_ROLE']), RolesController)
router.get('/permissions', authorize(['EDIT_ROLE']), PermissionsController)
router.post('/create', authorize(['ADD_ROLE']), CreateRoleController)
router.put('/update', authorize(['EDIT_ROLE']), UpdatePermissionsRoleController)
router.get('/all', authorize(['EDIT_USER']), RolesAllController)

export default router