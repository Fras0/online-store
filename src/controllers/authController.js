/**
 * @author : Fras 
 * @info   : file contains the controllers for the users .
 */
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import {
  passwordIsConfirmed,
  userDetailsAreValid,
} from "../utils/validation.js";
import {
  generateToken
} from "../utils/authentication.js";
import { AppError } from "../utils/appError.js";

/**
 * @info : this controller is responsible for the user registeration
 * @param {req} => the user request.
 */
const signUp = asyncHandler(async (req, res, next) => {
  // const { name, email, password } = req.body

  const enteredData = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body["confirm-password"],
    name: req.body.name,
    phone: req.body.phone,
  };

  if (
    !userDetailsAreValid(
      req.body.email,
      req.body.password,
      req.body["confirm-password"],
      req.body.name,
      req.body.phone
    ) ||
    !passwordIsConfirmed(req.body.password, req.body["confirm-password"])
  ) {
    return next(new AppError("Please check your inputs again", 400));
  }

  const userExists = await User.findOne({ email: enteredData.email });

  if (userExists) {
    res.status(400);
    return next(new AppError("user allready exists", 400));
  }

  const user = await User.create({
    name: enteredData.name,
    email: enteredData.email,
    password: enteredData.password,
    phone: enteredData.phone,
  });

  if (user) {


    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: enteredData.phone,
      isAdmin: user.isAdmin,
      token: token,
    });
  } else {
    return next(new AppError("invalid user data", 400));
  }
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {

    const token = generateToken(user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      token: token,
    });

  } else {
    return next(new AppError("Invalid email or password", 401));
  }
});


const updatePassword = asyncHandler(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');
  // 2) Check if POSTed current password is correct
  if (!(await user.matchPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong', 401));
  }
  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
});


export { login, signUp, updatePassword };
