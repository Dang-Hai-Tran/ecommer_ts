import express from "express";
import accessRouter from "./access/index";

const router = express.Router();
router.use("/", accessRouter);

export default router;
