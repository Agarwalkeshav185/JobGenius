import UserRepository from '../repositories/user-repository.js';
import { uploadResumeToCloudinary } from '../utils/cloudinaryUpload.js';
import { ErrorHandler } from '../middlewares/error-middlewares.js';

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

}
export default UserService;