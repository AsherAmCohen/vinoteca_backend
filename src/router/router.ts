import { RequestHandler, Router } from "express";
import { creadUser, readUsers } from "../controller/userController";
import { creadRole } from "../controller/rolesController";
import { creadProduct, deleteProduct, readProducts, updateProduct } from "../controller/productController";

const start: RequestHandler=async(request:any, response)=>{
    try {
        response.json({API:'vinoteca'})
    } catch (error) {
        response.json(500).send({msg:'ERROR'})
    }
}
const router:Router=Router();

// Rutas
router.get('/',start);
router.post('/creadUser', creadUser);
router.get('/readUsers', readUsers);
router.post('/creadRole', creadRole);

router.post('/creadProduct', creadProduct);
router.get('/readProducts', readProducts);
router.put('/updateProduct', updateProduct);
router.delete('/deleteProduct', deleteProduct)
module.exports=router;
