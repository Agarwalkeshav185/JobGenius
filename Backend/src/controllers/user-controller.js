import { catchAsynErrors } from '../middlewares/catchAsyncErrors.js';
import { ErrorHandler } from '../middlewares/error-middlewares.js';
import { validateUserRegistration } from '../validators/UserRequestValidator.js';
import  UserService from '../services/user-service.js';
import { sendToken } from '../utils/jwtToken.js';
import User from '../models/user.js';

const userService = new UserService();

const register = catchAsynErrors(async (req, res, next) => {
    const error = validateUserRegistration(req.body);
    if (error) return next(new ErrorHandler(error, 400));

    const user = await userService.signup(req.body, req.files?.resume);

    sendToken(user, 201, res , 'User Registered.');
});


const loginUser = catchAsynErrors(async (req, res, next) => {
    const {role, email, password} = req.body;
    if(!role || !email || !password){
        return next(
            new ErrorHandler('Email, Password and Role are required.', 400)
        );
    }
    const user = await userService.loginUser({ role, email, password });
    sendToken(user, 200, res, 'User Logged in Successfully');
});

const logout = catchAsynErrors(async (req, res, next)=>{
    return res.status(200).cookie('token','', {
        expires : new Date(),
        httpOnly : true
    }).json({
        success: true,
        message : 'Logged out successfully'
    });
});

const getUser = catchAsynErrors( async (req, res, next)=>{
    try {
        const user = await userService.getUser(req.user.id);
        return res.status(200).json({
            data : user,
            success : true,
            message : 'Successfully fetched the details of the user',
            err : {}
        });
    } catch (error) {
        console.log('GetUser Controller Error');
        return res.status(500).json({
            success : false,
            message : 'Failed to Fetched the details.',
            err : error
        });
    }
});

const updateProfile = catchAsynErrors(async (req, res, next)=>{
    try {
        const updatedProfile = await userService.updateProfile(req.body, req.user, req.files?.resume);
        return res.status(200).json({
            success : true,
            message : 'Profile Updated Successfully',
            data : updatedProfile
        })
    } catch (error) {
        console.log('UpdateProfile Controller Error');
        return res.status(500).json({
            success : false,
            message : error.message,
            err : error
        });
    }
})

export {
    register,
    loginUser,
    logout,
    getUser,
    updateProfile,

}