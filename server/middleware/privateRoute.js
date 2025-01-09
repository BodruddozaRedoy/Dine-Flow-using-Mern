import { User } from "../model/authModel.js"
import { verifyToken } from "../utils/jwt.js"

export const privateRoute = async (req, res, next) => {
    const token = req.cookies.token
    if(!token) return res.status(400).send({success:false, message: "User not found, Please Login"})
    const decoded = verifyToken(token)
    const dbUser = await User.findOne({email:decoded.email})
    if(!dbUser) return res.status(400).send({success:false, message: "Invalid token"})
    if(decoded.email !== dbUser.email) return res.status(400).send({success:false, message: "Invalid email"})
    // if(decoded.password !== dbUser.password) return res.status(400).send({success:false, message: "Invalid password"})
    const reqUser = {
            // name:dbUser.name,
            email:dbUser.email,
            // profilePic:dbUser.profilePic,
            // role:dbUser.role
        }
    req.user = reqUser
    next()
}