import mongoose from "mongoose";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import fs from "fs";

import Company from "../models/company.js";
import Category from "../models/category.js";
import companiesData from "../seedData/CompaniesSeedData/engineeringManufacturing.js";

dotenv.config({ path: "E:/JobGenius/Backend/.env" });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const seedCompanies = async () => {
  try {
    // connect to DB
    const URI = `${process.env.MONGO_URI}/JOB_PORTAL_DB`;
    await mongoose.connect(URI);
    console.log("✅ Connected to DB");

    // clear old data
    await Company.deleteMany();
    console.log("🗑️ Old companies deleted");

    // loop through companies
    for (const company of companiesData) {
      // 1. Upload logo to Cloudinary
      const logoPath = path.resolve("seedData", company.logo.path); // adjust path
      if (!fs.existsSync(logoPath)) {
        console.log(`⚠️ Logo file not found: ${logoPath}`);
        continue;
      }

      const result = await cloudinary.uploader.upload(logoPath, {
        folder: "Company_Logos",
      });

      // 2. Find Category by name
      const category = await Category.findOne({ name: company.categoryName });
      if (!category) {
        console.log(`⚠️ Category not found: ${company.categoryName}`);
        continue;
      }

      // 3. Create company with Cloudinary logo + category reference
      await Company.create({
        name: company.name,
        description: company.description,
        website: company.website,
        location: company.location,
        logo: {
          public_id: result.public_id,
          url: result.secure_url,
        },
        category: category._id,
      });

      console.log(`✅ Inserted company: ${company.name}`);
    }

    console.log("🎉 Companies seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seedCompanies();
