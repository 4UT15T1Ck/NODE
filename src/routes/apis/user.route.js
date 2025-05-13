import express from "express";
import UserController from "../../controllers/user.controller.js";
import { ValidateUserId } from "../../middlewares/user.validate.js";
import { authenticateJWT } from "../../middlewares/authenticate.JWT.js";

const router = express.Router();

router.route("/")
    .get(UserController.GetAll)
    .post(UserController.Create);

router
    .route("/:id")
    .get(authenticateJWT, UserController.GetById)
    .put(authenticateJWT, UserController.Update)
    .delete(authenticateJWT, UserController.Delete);

router.route("/email").post(UserController.SendEmail);
router.route("/forgot-password").post(UserController.ForgotPassword);
router.route("/reset-password").post(UserController.ResetPassword);

router.route("/register").post(UserController.Register);
router.route("/login").post(UserController.Login);

export default router;
