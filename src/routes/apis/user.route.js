import express from "express"
import userController from "../../controllers/user.controller.js"
import { ValidateUserId } from "../../middlewares/user.validate.js"
const router = express.Router()

router.route("/")
    .get(userController.GetAll)
    .post(userController.Post)

router
    .route("/filter")
    .get(userController.GetByField)
    
router
    .route("/:id")
    .get(userController.GetById)
    .put(userController.PutById)
    .delete(userController.DeleteById)

export default router
