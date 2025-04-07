import { v2 as cloudinary } from 'cloudinary';

export const uploadResumeToCloudinary = async (resume) => {
    try {
        const result = await cloudinary.uploader.upload(resume.tempFilePath, {
            folder: 'Job_Seeker_Resume'
        });
        if(!result || result.error){
            throw new Error('Failed to upload the resume on cloud.');
        }
        return {
            public_id: result.public_id,
            url: result.secure_url
        };
    } catch (err) {
        throw new Error('Resume upload failed');
    }
};
