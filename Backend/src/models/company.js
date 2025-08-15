import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
    }

}, {timestamps: true});

const Company = mongoose.model('Company', companySchema);
export default Company;