import { RequestHandler, Router } from "express";
const start: RequestHandler=async(request:any, response)=>{
    try {
        response.json({API:'vinoteca'})
    } catch (error) {
        response.json(500).send({msg:'ERROR'})
    }
}
const router:Router=Router();
router.get('/',start);
module.exports=router;
