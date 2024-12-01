import express, { IRouter } from "express";
import authController from "../controllers/authController"

const router : IRouter = express.Router()

router.use("/auth",authController );
export default router
// router.use("/post" , puzzeleController)