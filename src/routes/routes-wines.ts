import { Router } from "express";
import { InfoWineController, StoreWineController, UpdateWineController, WineImageController, WinesController, WinesInStockController } from "../controllers/controllers-wine";
import { storage } from "../storage/storage";
import multer from "multer";
import { authenticateToken } from "../middlewares/auth-middleware";
import { verifyInternalApiKey } from "../middlewares/internal-api-key";
import { authorize } from "../middlewares/permission-middleware";

const router: Router = Router();

// Configuración para cargar archivos
const uploads = multer({ storage })

router.post('/storeWine', verifyInternalApiKey, authenticateToken, uploads.single('image'), StoreWineController)
router.get('/wines', verifyInternalApiKey, authenticateToken, authorize(['VIEW_WINE']), WinesController)
router.get('/image', WineImageController)
router.put('/update', verifyInternalApiKey, authenticateToken, authorize(['EDIT_WINE']), uploads.single('image'), UpdateWineController)
router.get('/wine', verifyInternalApiKey, InfoWineController)
router.get('/inStock', verifyInternalApiKey, WinesInStockController)

export default router