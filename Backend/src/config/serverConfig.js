import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;
const MONGO_URI = process.env.MONGO_URI;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const COOKIE_EXPIRE = process.env.COOKIE_EXPIRE;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_EXPIRE = process.env.JWT_EXPIRE;
const SALT = bcrypt.genSaltSync(10);

export {
    PORT,
    FRONTEND_URL,
    MONGO_URI,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    COOKIE_EXPIRE,
    JWT_SECRET_KEY,
    JWT_EXPIRE,
    SALT,

}