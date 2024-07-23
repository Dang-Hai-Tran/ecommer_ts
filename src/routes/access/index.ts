import express from "express";
import AccessController from "../../controllers/access.controller";
import { authentication } from "../../utils/check.auth";

const router = express.Router();
// SignUp
router.post("/shop/signup", AccessController.signUp);
router.post("/shop/login", AccessController.logIn);

// Authentication
router.use(authentication);

// Logout
router.post("/shop/logout", AccessController.logOut);

export default router;
