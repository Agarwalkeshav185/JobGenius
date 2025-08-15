import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import { JWT_SECRET_KEY, JWT_EXPIRE, SALT } from "../config/serverConfig.js";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minLength : [3,'Name must contain alteast 3 characters'],
        maxLength : [30, 'Name cannot exceed 30 characters']
    },
    email : {
        type : String,
        required : true,
        validate : [validator.isEmail, 'Please Provide Valid Email']
    },
    phoneNumber : {
        type : Number,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    password : {
        type : String, 
        required : true,
        minLength : [8, 'Password must contain aleast 8 characters'],
        maxLength : [32, 'Password cannot exceed 32 characters'],
        select : false
    },
    resume : {
        public_id : String,
        url : String
    },
    coverLetter : {
        type : String, 
    },
    role : {
        type : String,
        enum : ['Job Seeker', 'Employer', 'Admin'],
        required : true,
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationOTP: {
        type: String
    },
    emailVerificationOTPExpires: {
        type: Date
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        default: null
    }
}, {timestamps : true});
userSchema.pre('save', function(next){
    try {
        const user = this;
        if(!user.isModified('password')){
            next();
        }
        const encryptedPassword = bcrypt.hashSync(user.password, SALT);
        user.password = encryptedPassword;
        next();
    } catch (error) {
        throw error;
    }
});

userSchema.methods.comparePassword = function(enteredPassword){
    try {
        return bcrypt.compareSync(enteredPassword, this.password);
    } catch (error) {
        throw error;
    }
}
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id : this._id}, JWT_SECRET_KEY, {
        expiresIn : JWT_EXPIRE 
    });
}

const User = mongoose.model('User', userSchema);
export default User;