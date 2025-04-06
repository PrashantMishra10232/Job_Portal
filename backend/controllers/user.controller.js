import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import JsonWebToken from "jsonwebtoken";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken; //assigning the refreshToken to the user object
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generating refresh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, phoneNumber, role } = req.body;

  if (
    [fullName, email, phoneNumber, password, role].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ fullName }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or userName already existed");
  }

  const profilePhoto = await uploadOnCloudinary(
    req.file.buffer,
    req.file.originalname
  );

  // console.log(profilePhoto);
  const profilePhoto_id = profilePhoto.public_id;

  if (!profilePhoto) {
    throw new ApiError(401, "Error while uploading the profile photo");
  }

  const user = await User.create({
    fullName,
    email,
    phoneNumber,
    role,
    password,
    profile: {
      profilePhoto: profilePhoto?.url || "",
      profilePhoto_id: profilePhoto_id,
    },
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { role, email, password } = req.body;

  if (!(email || password || role)) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  //checkin if the password is correct
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  //check for correct role
  if (role !== user.role) {
    throw new ApiError(400, "Account does  not exist with current role");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none", // ✅ Allows cross-origin cookies
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { loggedInUser, accessToken },
        "User logged in successfully"
      )
    );
});

const logOut = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, //removes the field from the document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  // const user = req.user._id;
  // const incomingRefreshToken = await user.findOne;
  // console.log(incomingRefreshToken);

  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = JsonWebToken.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refesh Token is Expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    const { accessToken } = await generateAccessAndRefreshToken(user._id);

    return (
      res
        .status(200)
        .cookie("accessToken", accessToken, options)
        // .cookie("refreshToken", newRefreshToken, options)
        .json(new ApiResponse(200, { accessToken }, "Access Token refreshed"))
    );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const updateProfile = asyncHandler(async (req, res) => {
  const { fullName, email, phoneNumber, bio, skills } = req.body;
  console.log(fullName, email, phoneNumber, bio, skills);

  const resume = await uploadOnCloudinary(
    req.file.buffer,
    req.file.originalname
  );

  if (!resume) {
    throw new ApiError(400, "Error while uploading resume");
  }

  const skillsArray = Array.isArray(skills) ? skills : skills?.split(",");
  const userId = req.user._id;
  let user = await User.findById(userId);

  if (!user) {
    throw new ApiError(400, "user not found");
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        ...(fullName && { fullName }),
        ...(email && { email }),
        ...(phoneNumber && { phoneNumber }),
        ...(bio && { "profile.bio": bio }),
        ...(skillsArray && { "profile.skills": skillsArray }),
        ...(resume && { "profile.resume": resume.url }),
      },
    },
    { new: true } // `new: true` returns the updated user
  ).select("-refreshToken -password");

  console.log("fullName", updatedUser.fullName);
  console.log("updatedUser", updatedUser);

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Profile updated"));
});

const updateProfilePhoto = asyncHandler(async (req, res) => {
  // Check if the user has an existing profile photo ID (only delete if it exists)
  if (User.profilePhoto_id) {
    try {
      await deleteFromCloudinary(User.profilePhoto_id); // Delete the previous profile photo from Cloudinary
    } catch (error) {
      throw new ApiError(500, "Error while deleting previous profile photo");
    }
  }

  const profilePhoto = await uploadOnCloudinary(req.file.buffer, req.file.originalname);
  const profilePhoto_id = profilePhoto.public_id;

  if (!profilePhoto) {
    throw new ApiError(400, "Error while uploading profile photo");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        profile: {
          profilePhoto: profilePhoto.url,
          profilePhoto_id: profilePhoto_id,
        },
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Profile Photo Updated successfully"));
});

export {
  generateAccessAndRefreshToken,
  registerUser,
  loginUser,
  logOut,
  refreshAccessToken,
  updateProfile,
  updateProfilePhoto,
};
