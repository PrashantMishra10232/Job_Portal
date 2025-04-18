import { Company } from "../models/company.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerCompany = asyncHandler(async (req, res) => {
  const { name, description, website, location, logo } = req.body;
  if (!name) {
    throw new ApiError(401, "Comapany name is required");
  }

  const existedCompanyName = await Company.findOne({ name: name });

  if (existedCompanyName) {
    throw new ApiError(400, "Company is already registered");
  }

  const company = await Company.create({
    name: name,
    description,
    website,
    location,
    logo,
    userId: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, company, "Company registered successfully"));
});

const getCompany = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(401, "User id is required");
  }
  const companies = await Company.find({ userId });
  if (!companies) {
    throw new ApiError(404, "No company found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, companies, "Companies Available!"));
});

const getCompanyById = asyncHandler(async (req, res) => {
  const companyId = req.params.id;
  const company = await Company.findById(companyId);
  if (!company) {
    throw new ApiError(404, "No company found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, company, "Companies Available!"));
});

const updateCompany = asyncHandler(async (req, res) => {
  const { name, description, website, location } = req.body;
  
  const logo = await uploadOnCloudinary(req.file.buffer,req.file.originalname);
  if (!logo) {
    throw new ApiError(401, "Error while uploading logo");
  }

  const company = await Company.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name,
        description,
        website,
        location,
        logo: logo?.url,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, company, "Details updated successfully"));
});

export { registerCompany, getCompany, getCompanyById, updateCompany };
