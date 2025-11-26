import mongoose from "mongoose";
import validate from'validator';

const applicationSchema = new mongoose.Schema({
    jobSeekerInfo : {
        id : {
            type : mongoose.Schema.Types.ObjectId,
            required : true
        },
        name : {
            type : String, 
            required : true
        },
        email : {
            type: String,
            required :true,
            validate : [validate.isEmail ,"Please Provide a valid Number"]
        },
        phoneNumber : {
            type: Number,
            required : true
        },
        address : {
            type : String,
            required : true
        },
        resume : {
            public_id : String,
            url : String
        },
        coverLetter : {
            type : String
        },
        role : {
            type : String,
            enum : ['Job Seeker'],
            required : true
        },
        SocialMediaLinks : {
            Linkedin : {
                type: String,
                default : ""
            },
            GitHub : {
                type: String,
                default : ""
            },
            Portfolio : {
                type: String,
                default : ""
            },
        }
    },
    employerInfo : {
        id : {
            type :mongoose.Schema.Types.ObjectId,
            ref : 'User',
            required : true
        },
        role : {
            type : String,
            enum : ['Employer'],
            required : true
        }
    },
    jobInfo : {
        jobId : {
            type :mongoose.Schema.Types.ObjectId,
            required : true
        },
        jobTitle : {
            type : String,
            required : true
        }
    },
    deletedBy : {
        jobSeeker : {
            type : Boolean,
            default : false
        },
        employer : {
            type : Boolean,
            default : false
        }
    }
});

const Application = mongoose.model('Application', applicationSchema);

export default Application;