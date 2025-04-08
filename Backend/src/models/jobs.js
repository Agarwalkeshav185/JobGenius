import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title : {
        type: String,
        required : true
    },
    jobType : {
        type : String,
        required : true,
        enum : ['Full-Time', 'Part-Time', 'Remote']
    },
    location : {
        type : String,
        required : true
    },
    companyName : {
        type : String, 
        required : true
    },
    introduction : {
        type : String
    },
    responsibilites : {
        type : String ,
        required : true
    },
    qualifications : {
        type : String,
        required : true
    },
    offers: {
        type : String
    },
    salary : {
        type : String,
        required : true
    },
    hirihngMultipleCandidates : {
        type : String,
        default : 'No',
        enum : ['Yes', 'No']    
    },
    personalWebsite : {
        title : String,
        url : String
    },
    jobNiche : {
        type : String,
        required : true
    },
    newsLetterSend : {
        type : Boolean,
        default : false
    },
    jobPostOn : {
        type : Date,
        default : Date.now()
    },
    postedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
});

const Job = mongoose.model('Job', jobSchema);

export default Job;