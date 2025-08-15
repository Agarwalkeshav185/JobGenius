import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    },
    description: String,
    is_active:{
        type : Boolean
    },
    slug : [
        {
            type: String
        }
    ],
    icon : String
}, {timestamps : true});

const Category = mongoose.model('Category', categorySchema);
export default Category;