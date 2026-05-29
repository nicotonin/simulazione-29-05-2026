import { Router } from "express";
import { isAuthenticated } from "../../lib/auth/auth.middleware";
import { listUsers } from "./user.controller"; 
import { validate } from "../../lib/validation-middleware";



const router = Router();

router.get('/',listUsers); 

export default router;