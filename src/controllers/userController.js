/**
 * @author : Fras 
 * @info   : file contains the controllers for the users .
 */
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import HandlerFactory from "./handlerFactory.js";

class UserController extends HandlerFactory {
    constructor() {
        super(User);
    }

    // required userController.getOne after this 
    getMe = (req, res, next) => {
        req.params.id = req.user.id;
        next();
    };
}
export default UserController;