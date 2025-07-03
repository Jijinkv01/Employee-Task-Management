const express = require("express")
const router = express.Router()
const adminController = require("../../controller/adminController")
const verifyAdminToken = require("../../middleware/adminAuth")

router.post("/login",adminController.login)
router.post("/logout",adminController.logout)
router.get("/getAllUsers",verifyAdminToken,adminController.getAllUsers)
router.delete("/deleteUser/:id",verifyAdminToken,adminController.deleteUser)
router.put("/updateUser/:id",verifyAdminToken,adminController.updateUser)
router.post("/createUser",verifyAdminToken,adminController.createUser)
router.get("/getEmployeeNames",adminController.getEmployeeNames)
router.post("/createTask",adminController.createTask)




module.exports = router