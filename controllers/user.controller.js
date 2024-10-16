import User from "../models/User.js";
import { createError } from "../utils/errorResponse.js";
import { createSuccess } from "../utils/successResponse.js";

export const getAllUsers = async(req, res, next) =>{

    try {
        const users = await User.find();
        return next(createSuccess(200,"Success", users));

    } catch (error) {
        return next(createError(500, "Internal sever error"));
    }
}


export const getUserById = async(req, res, next) =>{

    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return next(createError(404, "User not found"));
        }
        return next(createSuccess(200,"Success", user));

    } catch (error) {
        return next(createError(500, "Internal sever error"));
    }
}


