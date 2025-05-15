import express from "express";
import userRoute from "./apis/user.route.js";
import uploadLocal from './apis/attachment.route.js'

const router = express.Router();

router.use("/users", userRoute);
router.use("/upload", uploadLocal);

export default router;