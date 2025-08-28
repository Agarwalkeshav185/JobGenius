import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title : {
        type: String,
        required : true
    },
    companyId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        required : true
    },
    location : {
        type : String,
        required : true
    },
    jobType : {
        type : String,
        required : true,
        enum : ['Full-Time', 'Part-Time', 'Remote','Contract', 'Internship', 'Temporary']
    },
    status :{
        type: String,
        required: true,
        default : 'Draft',
        enum: ['Open', 'Closed', 'Draft','Paused']
    },
    minSalary : {
        type : Number,
        required : true
    },
    maxSalary : {
        type : Number,
        required : true
    },
    jobPostDeadline : {
        type : Date,
        required : true
    },
    introduction : {
        type : String
    },
    responsibilities : [{
        type : String ,
        required : true
    }],
    qualifications : [{
        type : String,
        required : true
    }],
    offers: [{
        type : String
    }],
    hiringMultipleCandidates : {
        type : String,
        default : 'No',
        enum : ['Yes', 'No']    
    },
    postedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
}, {timestamps: true});

const Job = mongoose.model('Job', jobSchema);

export default Job;