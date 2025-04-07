import UserRepository from '../repositories/user-repository.js';
import { uploadResumeToCloudinary } from '../utils/cloudinaryUpload.js';
import { ErrorHandler } from '../middlewares/error-middlewares.js';
import cloudinary from 'cloudinary';

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
                niches : {
                    firstNiche : data.firstNiche,
                    secondNiche : data.secondNiche,
                    thirdNiche : data.thirdNiche
                }, 
                coverLetter : data.coverLetter
            }

            if(resumeFile){
                    try {
                        const resume = await uploadResumeToCloudinary(resumeFile);
                        userData.resume = resume;
                    } catch (error) {
                        return next(new ErrorHandler('Failed to upload Resume', 500));
                    }
                } 
            const user = await this.userRepository.create(userData);
            return user;

        } catch (error) {
            console.log('Signup Service Error');
            throw error;
        }
    }

    async loginUser({role, email, password}){
        try {
            const user = await this.userRepository.getByEmailWithPassword(email);
            if(!user){
                return next(new ErrorHandler('Invalid email or password.', 400));
            }

            const isPasswordMatched = await user.comparePassword(password);
            if(!isPasswordMatched || user.role != role){
                return next(new ErrorHandler('Invalid email or password.', 400));
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
            userNewData.niches = {};
            if(data.firstNiche) userNewData.niches.firstNiche = data.firstNiche;
            if(data.secondNiche) userNewData.niches.secondNiche = data.secondNiche;
            if(data.thirdNiche) userNewData.niches.thirdNiche = data.thirdNiche;
            if(user.role == 'Job Seeker' && (!userNewData.niches.firstNiche || !userNewData.niches.secondNiche || !userNewData.niches.thirdNiche)){
                throw new Error('Please provide your all perferred job niches.');
            }

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

}
export default UserService;