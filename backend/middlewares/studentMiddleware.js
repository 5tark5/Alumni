import jwt from "jsonwebtoken";
import Student from "../models/studentModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => { 
    let token ;
    token = req.cookies.jwt;

    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.student = await Student.findById(decoded.userId).select("-studentPassword");
            next();
        }catch(error){
            res.status(401);
            throw new Error("Not authorized");
        }
    }else{
        res.status(401); 
        throw new Error("Not authorized, no token");
    }
});

export { authenticate };