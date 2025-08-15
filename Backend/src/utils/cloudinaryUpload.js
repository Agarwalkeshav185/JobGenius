import { v2 as cloudinary } from 'cloudinary';
import { ErrorHandler } from '../middlewares/error-middlewares.js';

export const uploadResumeToCloudinary = async (resume) => {
    try {
        const result = await cloudinary.uploader.upload(resume.tempFilePath, {
            folder: 'Job_Seeker_Resume'
        });
        if(!result || result.error){
            throw new ErrorHandler('Failed to upload the resume on cloud.', 500);
        }
        return {
            public_id: result.public_id,
            url: result.secure_url
        };
    } catch (err) {
        throw new ErrorHandler('Resume upload failed',500);
    }
};
