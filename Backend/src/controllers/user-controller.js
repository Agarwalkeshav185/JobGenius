import { catchAsynErrors } from '../middlewares/catchAsyncErrors.js';
import { ErrorHandler } from '../middlewares/error-middlewares.js';
import { validateUserRegistration } from '../validators/UserRequestValidator.js';
import  UserService from '../services/user-service.js';
import { sendToken } from '../utils/jwtToken.js';

const userService = new UserService();

const register = catchAsynErrors(async (req, res, next) => {
    const error = validateUserRegistration(req.body);
    if (error) return next(new ErrorHandler(error, 400));

    const user = await userService.signup(req.body, req.files?.resume);

    res.status(201).json({
        success: true,
        message: 'User registered. Please verify your email.',
        user: { email: user.email }
    });
});

const verifyEmailOTP = catchAsynErrors(async (req, res, next) => {
    const {email, otp} = req.body;
    if(!email || !otp){
        return next(new ErrorHandler('Email and OTP are required.', 400));
    }
    const user = await userService.verifyEmailOTP(email, otp);
    sendToken(user, 200, res, 'Email verified successfully');
});


const loginUser = catchAsynErrors(async (req, res, next) => {
    try {
        const {role, email, password} = req.body;
        if(!role || !email || !password){
            return next(
                new ErrorHandler('Email, Password and Role are required.', 400)
            );
        }
        const user = await userService.loginUser({ role, email, password });
        sendToken(user, 200, res, `User Logged in Successfully`);
    } catch (error) {
        return res.status(error.statusCode).json({
            success : false,
            message : error.message
        });
    }
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
});

const updatePassword = catchAsynErrors( async (req, res, next)=>{
    try {
        const response = await userService.updatePassword(req.body, req.user);
        sendToken(response, 200, res, 'Password Updated Successfully');
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message,
            err : error
        })
    }
})

export {
    register,
    loginUser,
    logout,
    getUser,
    updateProfile,
    updatePassword,
    verifyEmailOTP

}