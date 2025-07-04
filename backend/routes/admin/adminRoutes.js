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
router.get("/getEmployeeNames",verifyAdminToken,adminController.getEmployeeNames)
router.post("/createTask",verifyAdminToken,adminController.createTask)
router.get("/fetchTasks",verifyAdminToken,adminController.fetchTasks)
router.delete("/deleteTask/:id",verifyAdminToken,adminController.deleteTask)
router.get("/dashboardCounts",verifyAdminToken,adminController.dashboardCounts)
router.get("/userRes/:id",verifyAdminToken,adminController.userRes)
router.get("/taskRes/:id",verifyAdminToken,adminController.taskRes)
router.patch("/updateTaskStatus/:taskId",verifyAdminToken,adminController.updateTaskStatus)




module.exports = router