import { JWT_SECRET_KEY } from "../config/serverConfig.js";
import { catchAsynErrors } from "./catchAsyncErrors.js";
import { ErrorHandler } from "./error-middlewares.js";
import jwt from 'jsonwebtoken';
import UserRepository from "../repositories/user-repository.js";

const userRepository = new UserRepository();

const isAuthenticated = catchAsynErrors(async(req, res, next)=>{
    const {token} = req.cookies;
    if(!token){
        return res.status(400).json({
            success : false,
            message : 'User is not authenticated'
        });
    }
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = await userRepository.get(decoded.id);
    next();
});

const isAuthorized = (...roles)=>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(400).json({
                success : false,
                message : `${req.user.role} not allowed to access this resource.`
            });
        }
        next();
    }
}


export {
    isAuthenticated,
    isAuthorized
}