import Role from '../models/Role.js';

import { createSuccess } from '../utils/successResponse.js';
import { createError } from '../utils/errorResponse.js';

export const createRole = async(req, res, next) => {
    try {
        if(req.body.role && req.body !== ''){
            const newRole = new Role(req.body);
            await newRole.save();

            return next(createSuccess(200,"Role is created succussfully", newRole));
        } else{
            return next(createError(400,"Bad Request"));
        }
    } 
    catch (error) {
        return next(createError(500,"Internal server error"));
    }
}

export const updateRole = async(req, res, next) => {
    try {
        const role = await Role.findById({_id: req.params.id})
        if(role){
            const newData = await Role.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new : true}
            );
            return next(createSuccess(200,"Role has been updated", newData));
        }else{
            return next(createError(404,"Role is not found"));
        }
    } 
    catch (error) {
        return next(createError(500,"Internal Server Error"));
    }
}


export const getAllRoles = async(req, res, next) => {
    try {
        const roles = await Role.find({});
        return next(createSuccess(200,"success", roles));
    } 
    catch (error) {
        return next(createError(500,"Internal Server Error"));
    }
}


export const deleteRole = async(req, res, next) => {
    try {
        const roleId = req.params.id;
        const role = await Role.findById(roleId);
        if(role){
                await Role.findByIdAndDelete(roleId);
                return next(createSuccess(200,"Role has been deleted"));
        }else{
            return next(createError(404,"Role is not found"));
        }
    } 
    catch (error) {
        return next(createError(500,"Internal Server Error"));
    }
}

