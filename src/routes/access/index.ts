import express from "express";
import AccessController from "../../controllers/access.controller";

const router = express.Router();

// SignUp
router.post("/shop/signup", AccessController.signUp);
router.post("/shop/login", AccessController.logIn);

export default router;
