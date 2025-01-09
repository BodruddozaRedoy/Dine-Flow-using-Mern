import jwt from 'jsonwebtoken'


export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: '7d'
    })
}

export const verifyToken = (payload) => {
    return jwt.verify(payload, process.env.JWT_SECRET_KEY)
}