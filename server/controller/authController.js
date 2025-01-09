import jwt from 'jsonwebtoken'
import { User } from '../model/authModel.js'
import { generateToken } from '../utils/jwt.js'


export const registerUser = async (req, res) => {
    const {name, email, profilePic, password, role} = req.body
    try {
        // console.log(req.body);
        
        // if(!email || !password) return res.status(400).send({success: false, message: "All fields required"})
        const existUser = await User.findOne({email:email})
        // if(existUser?.email === email) return res.status(400).send({success: false, message: "User already exist"})
            const newUser = new User({
                // name,
                email,
                // profilePic,
                // password,
                // role: "user"
            })
            await newUser.save()
        // console.log(existUser.email);
        
        const token = generateToken({email:existUser.email})
        // console.log(token);
        
        res.cookie("token", token, {
            httpOnly: true,
            // secure: false,
            // sameSite: 'Lax',
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).send({success: true, message: "Registered successfully"})
        
    } catch (error) {
        console.log("Error at register user", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const loginUser = async (req, res) => {
    const {email, password} = req.body
    try {
        if(!email || !password) return res.status(400).send({success: false, message: "All fields required"})

        const dbUser = await User.findOne({email:email})

        if(!dbUser.email) return res.status(400).send({success: false, message: "User not found"})
        if(dbUser.password !== password) return res.status(400).send({success: false, message: "Invalid credentials"})

        const token = generateToken({email:dbUser.email, password:dbUser.password})

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        const user = {
            _id:dbUser._id,
            name:dbUser.name,
            email:dbUser.email,
            profilePic:dbUser.profilePic,
            role:dbUser.role
        }

        res.status(200).send({success: true, message: "Logged in successfully", user })
        
    } catch (error) {
        console.log("Error at login user", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const checkAuth = async (req, res) => {
    const user = req.user
    try {
        res.send(user)
    } catch (error) {
        console.log("Error at check auth user", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const logOut = async (req, res) => {
    try {
        res.clearCookie('token')
        res.status(200).json({ message: 'Logged out successfully' });
        // console.log("success");
        
    } catch (error) {
        console.log("Error at logout user", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    const {email, name, profilePic} = req.body
    try {
        const dbUser = await User.findOne({email:email}).select("-password")
        if(!dbUser) return res.status(400).send({success: false, message: "User not found"})
        const updatedUser = await User.findOneAndUpdate({email}, {email:email, name:name, profilePic:profilePic})
        const user = {
            _id:dbUser._id,
            name:updatedUser.name,
            email,
            profilePic:updatedUser.profilePic,
            role:dbUser.role
        }
        res.status(200).send({success: true, message: "Updated successfully", user })
    } catch (error) {
        console.log("Error at update user", error.message);
        res.status(500).json({ message: error.message });
    }
}