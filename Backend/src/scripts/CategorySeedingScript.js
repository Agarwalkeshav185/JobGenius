import mongoose from 'mongoose';
import Category from '../models/category.js';
import categoriesData from '../seedData/CategorySeedData.js';
import dotenv from "dotenv";

dotenv.config({ path: "E:/JobGenius/Backend/.env" });

// Remember to give the path because if path is not given then default that is searched is the parent of 
// the current folder ie here means src is searched for .env


// // If your data is an object of objects, convert to array
// const categoriesArray = Object.values(categoriesData);

async function seedCategories() {
  try {
    const URI = `${process.env.MONGO_URI}/JOB_PORTAL_DB`;
    await mongoose.connect(URI);

    // Only do this deleteMany when you want to remove all the previous data from the database. Advised not to do so manually created data will be lost.
    await Category.deleteMany({});
    await Category.insertMany(categoriesData);
    console.log('Categories seeded successfully!');
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seedCategories();