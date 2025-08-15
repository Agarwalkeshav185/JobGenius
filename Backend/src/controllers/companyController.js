import {
    createCompany,
    getAllCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
} from "../services/companyServices.js";
import cloudinary from "cloudinary";

export const create = async (req, res) => {
    try {
        let companyData = req.body;

        // If logo file is present
        if (req.files && req.files.logo) {
            const result = await cloudinary.v2.uploader.upload(
                req.files.logo.tempFilePath, // or req.files.logo.path
                { folder: "company_logos" }
            );
            companyData.logo = {
                public_id: result.public_id,
                url: result.secure_url
            };
        }
        const company = await createCompany(companyData);
        res.status(201).json({
            success: true,
            data: company,
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getAll = async (req, res) => {
    try {
        const companies = await getAllCompanies();
        res.status(200).json(companies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getById = async (req, res) => {
    try {
        const company = await getCompanyById(req.params.id);
        if (!company) return res.status(404).json({ error: "Company not found" });
        res.status(200).json(company);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const update = async (req, res) => {
    try {
        let companyData = req.body;

        // If logo file is present
        if (req.files && req.files.logo) {
            const result = await cloudinary.v2.uploader.upload(
                req.files.logo.tempFilePath,
                { folder: "company_logos" }
            );
            companyData.logo = {
                public_id: result.public_id,
                url: result.secure_url
            };
        }
        const company = await updateCompany(req.params.id, companyData);
        if (!company) return res.status(404).json({ error: "Company not found" });
        res.status(200).json({
            success: true,
            data: company
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const remove = async (req, res) => {
    try {
        const company = await deleteCompany(req.params.id);
        if (!company) return res.status(404).json({ error: "Company not found" });
        res.status(200).json({ message: "Company deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};