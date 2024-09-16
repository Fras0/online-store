import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import {
  passwordIsConfirmed,
  userDetailsAreValid,
} from "../utils/validation.js";
import {
  createUserSession,
  destroyUserAuthSession,
} from "../utils/authentication.js";

const signUp = asyncHandler(async (req, res) => {
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
    res.status(400);
    throw new Error("Please check your inputs again");
  }

  const userExists = await User.findOne({ email: enteredData.email });

  if (userExists) {
    res.status(400);
    throw new Error("user allready exists");
  }

  const user = await User.create({
    name: enteredData.name,
    email: enteredData.email,
    password: enteredData.password,
    phone: enteredData.phone,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: enteredData.phone,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });

    createUserSession(req, user);
    console.log(req.session.uid);
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const logout = (req,res) => {
  destroyUserAuthSession(req,(err)=>{
    if (err) {
      console.error('Error saving session:', err);
      res.status(500).send('Error logging out');
    } else {
      res.send('Logged out successfully');
    }
  });
};

export { login, logout, getUserProfile, signUp };
