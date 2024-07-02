import { Router } from "express";
import { savePassword } from "../controllers/user.controller.js";
const  userRoutes=Router();
userRoutes.post('/savePass',savePassword)
export {userRoutes}