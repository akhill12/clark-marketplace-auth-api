import User from '../models/User.js';
import Role from '../models/Role.js';
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { createSuccess } from '../utils/successResponse.js';
import { createError } from '../utils/errorResponse.js';
import * as emailController from './email.controller.js';
import crypto from 'crypto';


export const register = async (req, res, next) => {
    try {
        const role = await Role.find({ role: 'user' });

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const verificationTokengen = generateVerificationToken();

        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashPassword,
            roles: role,
            favorites: req.body.favorites,
            verificationToken: verificationTokengen,
            isActive: true,
        });
        await newUser.save();
        // //Send email
        // const emailSubject = 'Marketplace verification';
        // const emailBody = `Click the following link to verify your email: ${getVerificationLink(newUser)}`;
        // const emailSent = await emailController.sendVerficationEmail(newUser.email, emailSubject, emailBody);

        // if (!emailSent) {
        //     return next(createError(500, 'Error sending verification email'));
        // }

        return next(createSuccess(200, "Registration is success", newUser));
    }
    catch (error) {
        return next(createError(500, err.message));
    }
}

export const verifyToken = async (req, res, next) => {
    try {
        console.log("hit");
        console.log(req.params.token);
        const token = req.params.token;

        // Find the user by the verification token
        const user = await User.findOne({ verificationToken: token });
        console.log(user)
        if (!user) {
            console.log("user not found")
            return res.status(400).json({ message: 'Invalid verification token' });
        }

        // Update the user's isActive field to true
        user.isActive = true;
        //user.verificationToken = undefined;
        await user.save();
        return next(createSuccess(200, "Registration is success"));
    }
    catch (err) {
        return next(createError(500, "Internal server error"));
    }
}

const getVerificationLink = (user) => {
    return process.env.CLIENT_SITE+`/verify/${user.email}/${user.verificationToken}`;
};


export const registerAdmin = async (req, res, next) => {
    try {
        const role = await Role.find({});

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashPassword,
            isAdmin: true,
            roles: role
        });
        await newUser.save();
        return next(createSuccess(200, "Registration is success", newUser));
    }
    catch (error) {
        return next(createError(500, "Internal Server Error"));
    }
}


const generateVerificationToken = () => {
    const tokenLength = 32;
    return crypto.randomBytes(tokenLength).toString('hex');
};

export const login = async (req, res, next) => {
    try {

        const user = await User.findOne({ email: req.body.email }).populate("roles", "role");

        const { roles } = user;

        if (!user) {
            return next(createError(404, "User is not found"));
        }

        if(!user.isActive){
            return next(createError(401, "User is not active"));
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user.password);

        if (!isValidPassword) {
            return next(createError(400, "Password is incorrect"));
        }

        //Generate jwt tokens for securing the application
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin, roles: roles },
            process.env.JWT_SECRET
        );

        res.cookie("access_token", token, { httpOnly: true, secure: true })
            .status(200)
            .json({
                status: 200,
                message: "Login is Success",
                data: user
            })

        //return next(createSuccess(200,"Login is success", user));

    }
    catch (error) {
        return next(createError(500, "Internal server error"));
    }

}