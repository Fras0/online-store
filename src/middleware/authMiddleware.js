import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import { AppError } from '../utils/appError.js'
import { promisify } from 'util';

const protect = asyncHandler(async (req, res, next) => {
    // 1) Getting token and check if it's there
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return next(
            new AppError('You are not logged in! Please log in to get access', 401)
        );
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exsists
    const currentUser = await User.findById(decoded.id).select('-password')

    if (!currentUser) {
        return next(
            new AppError(
                'The user belonging to this token does no longer exist.',
                401
            )
        );
    }
    req.user = currentUser;
    next();
})


const restrictToAdmin = (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(new AppError('You do not have permission to perform this action', 401))
    }
    next();
};

export { protect, restrictToAdmin }