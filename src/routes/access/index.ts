import express from "express";
import AccessController from "../../controllers/access.controller";

const router = express.Router();

// SignUp
router.post("/shop/signup", AccessController.signUp);

export default router;
