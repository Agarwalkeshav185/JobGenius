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

    sendToken(user, 201, res , 'User Registered.');
});


// const login = catchAsynErrors(async (req, res, next) => {
//     const {role, email, password} = req.body;
//     if(!role || !email || !password){
//         return next(
//             new ErrorHandler('Email, Password and Role are required.', 400)
//         );
//     }
//     const user = await User.findOne({ email }).select ('+password');
//     if(!user){
//         return next(new ErrorHandler('Invalid email or password.', 400));
//     }

// });

export {
    register,
    // login
}