import express from 'express'
import { checkAuth, loginUser, logOut, registerUser, updateUser } from '../controller/authController.js'
import { privateRoute } from '../middleware/privateRoute.js'


const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logOut)
router.get("/check-auth",privateRoute, checkAuth)
router.post("/update-user", updateUser)

export default router