import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        // required: true,
        unique: true
    },
    phone:{
        type: String,
        // required: true,
        unique: true
    },
    description: String,
    website: String,
    location: String,
    logo: {
        public_id: String,
        url: String
    },
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    foundedYear : {
        type : String,
    },
    social : {
        linkedin : String,
        facebook : String,
        twitter : String,
    }

}, {timestamps: true});

const Company = mongoose.model('Company', companySchema);
export default Company;