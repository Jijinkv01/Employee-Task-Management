const express = require("express")
const router = express.Router()
const userController = require("../../controller/userController")
const verifyUserToken = require("../../middleware/userAuth")


router.post("/register",userController.registerUser)
router.post("/login",userController.login)
router.post("/logout",userController.logout)
router.get("/getTasks",verifyUserToken,userController.getTasks)
router.post("/commitTask/:taskId",verifyUserToken,userController.commitTask)





module.exports = router