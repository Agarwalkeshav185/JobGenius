import {COOKIE_EXPIRE} from '../config/serverConfig.js';

export const sendToken = async(user, statusCode, res, message)=>{
    try {
        const token = user.getJWTToken();
        const options = {
            expires : new Date( Date.now() +  COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly : true
        };
        return res.status(statusCode).cookie('token', token , options).json({
            success: true, 
            data : user,
            message : message,
            token : token
        });
    } catch (error) {
        throw error;
    }

}