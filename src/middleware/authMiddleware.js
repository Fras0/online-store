import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorizes, token failed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized')
    }
})


const restrictToAdmin = () => {
    return (req, res, next) => {
      if (!req.user.isAdmin) {
        throw new Error('You do not have permission to perform this action')
      }
      next();
    };
};

export { protect , restrictToAdmin }