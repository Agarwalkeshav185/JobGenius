import UserRepository from '../repositories/user-repository.js';
import { uploadResumeToCloudinary } from '../utils/cloudinaryUpload.js';
import { ErrorHandler } from '../middlewares/error-middlewares.js';
import cloudinary from 'cloudinary';
import { sendVerificationEmail } from '../utils/emailUtils.js';

class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async signup(data, resumeFile){
        try {
            const existingUser = await this.userRepository.getByEmail(data.email);
            if (existingUser) throw new ErrorHandler('Email is already registered.', 400);
            
            const userData = {
                name : data.name, 
                email : data.email,
                phoneNumber : data.phoneNumber, 
                address : data.address, 
                password : data.password, 
                role : data.role,  
                coverLetter : data.coverLetter
            }

            if(resumeFile){
                try {
                    const resume = await uploadResumeToCloudinary(resumeFile);
                    userData.resume = resume;
                } catch (error) {
                    throw new ErrorHandler('Failed to upload Resume', 500);
                }
            }
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const otpExpires = Date.now() + 1000 * 60 * 10; // 10 minutes expiry

            userData.emailVerificationOTP = otp;
            userData.emailVerificationOTPExpires = otpExpires;
            userData.emailVerified = false;

            sendVerificationEmail(userData.email, userData.emailVerificationOTP);

            const user = await this.userRepository.create(userData);
            return user;

        } catch (error) {
            console.log('Signup Service Error');
            throw error;
        }
    }

    async verifyEmailOTP(email, otp) {
        console.log(otp);
        const user = await this.userRepository.getByEmail(email);
        if (!user) throw new Error("User not found");
        if (user.emailVerified) throw new Error("Email already verified");
        if (user.emailVerificationOTPExpires < Date.now()) throw new Error("OTP expired");
        if (user.emailVerificationOTP !== otp) throw new Error("Invalid OTP");
        
        user.emailVerified = true;
        user.emailVerificationOTP = undefined;
        user.emailVerificationOTPExpires = undefined;
        await user.save();

        return user;
    }

    async loginUser({role, email, password}){
        try {
            const user = await this.userRepository.getByEmailWithPassword(email);
            if(!user){
                return new ErrorHandler('Invalid email.', 400);
            }

            const isPasswordMatched = await user.comparePassword(password);
            if(!isPasswordMatched || user.role != role){
                return new ErrorHandler('Invalid password.', 400);
            }
            return user;
        } catch (error) {
            console.log('Login User Service Error');
            throw error;   
        }
    }

    async getUser(id){
        try {
            const user = await this.userRepository.get(id);
            return user;
        } catch (error) {
            console.log('GetUser Service Error');
            throw error;
        }
    }

    async updateProfile(data, user, resumeFile) {
        try {
            const userNewData = {};
            if(data.name) userNewData.name = data.name;
            if(data.email) userNewData.email = data.email;
            if(data.phoneNumber) userNewData.phoneNumber = data.phoneNumber;
            if(data.address) userNewData.address = data.address;
            if(data.coverLetter) userNewData.coverLetter = data.coverLetter;

            if(resumeFile){
                const currentResumeId = user.resume?.public_id;
                if(currentResumeId){
                    await cloudinary.uploader.destroy(currentResumeId);
                }
                const newResume = await uploadResumeToCloudinary(resumeFile);
                userNewData.resume = {
                    public_id : newResume.public_id,
                    url : newResume.url
                }
            }

            const result = await this.userRepository.update(user.id, userNewData);
            return result;

        } catch (error) {
            console.log('Update Profile Service Error');
            throw error;
        }
    }

    async updatePassword(data,user){
        try {
            const oldUser = await this.userRepository.getByEmailWithPassword(user.email);

            const isMatched = await oldUser.comparePassword(data.oldPassword);
            if(!isMatched){
                throw new Error('Old password is incorrect.');
            }
            if(data.newPassword != data.confirmPassword){
                throw new Error('New Password and Confirm Password does not match.');
            }

            user.password = data.newPassword;
            await user.save();

            return user;
        } catch (error) {
            console.log('Update Password Service Error');
            throw error;
        }
    }

}
export default UserService;