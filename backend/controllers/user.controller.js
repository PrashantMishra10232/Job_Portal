import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import JsonWebToken from "jsonwebtoken";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import axios from "axios";
import bcrypt from "bcryptjs";

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

  const createdUser = await User.findById(user._id).select("-password");

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

  const loggedInUser = await User.findById(user._id).select("-password");

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none", // ✅ Allows cross-origin cookies
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, { options, maxAge: 60 * 60 * 1000 })
    .cookie("refreshToken", refreshToken, {
      options,
      maxAge: 10 * 24 * 60 * 60 * 1000,
    })
    .json(
      new ApiResponse(
        200,
        { loggedInUser, accessToken },
        "User logged in successfully"
      )
    );
});

const googleCallback = async (
  req,
  accessToken,
  refreshtoken,
  profile,
  done
) => {
  try {
    let user = await User.findOne({ googleId: profile.id });

    const role = req.role;

    if (!user) {
      const imageResponse = await axios.get(profile.photos[0].value, {
        responseType: "arraybuffer",
      });

      const fileName = `${profile.displayName.replace(/\s+/g, "_")}_photo`;

      const profilePhoto = await uploadOnCloudinary(
        imageResponse.data,
        fileName
      );

      user = await User.create({
        googleId: profile.id,
        fullName: profile.displayName,
        email: profile.emails[0].value,
        role,
        profile: {
          profilePhoto: profilePhoto?.url || "",
          profilePhoto_id: profilePhoto._id,
        },
      });
    }
    done(null, user); //passport attaches this user to req.user
  } catch (error) {
    console.error("Error in Google callback:", error);
    done(error, null);
  }
};

const handleLoginSuccess = asyncHandler(async (req, res) => {
  const user = req.user;

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select("-password");

  const userEncoded = Buffer.from(JSON.stringify(loggedInUser)).toString(
    "base64"
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  const redirectUrl = `${process.env.CLIENT_URL}/login/success?accessToken=${accessToken}&user=${userEncoded}`;

  return res
    .status(200)
    .cookie("accessToken", accessToken, { options, maxAge: 60 * 60 * 1000 })
    .cookie("refreshToken", refreshToken, {
      options,
      maxAge: 10 * 24 * 60 * 60 * 1000,
    })
    .redirect(redirectUrl);
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
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  // console.log("incomingRefreshToken", incomingRefreshToken);

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = JsonWebToken.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    // console.log("user token", user.refreshToken);

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

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);
    // console.log("Refreshed access token:", accessToken);
    // console.log("Refreshed refresh token:", newRefreshToken);

    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .cookie("accessToken", accessToken, { options, maxage: 60 * 60 * 1000 })
      .cookie("refreshToken", newRefreshToken, {
        options,
        maxage: 10 * 24 * 60 * 60 * 1000,
      })
      .json(new ApiResponse(200, { accessToken }, "Access Token refreshed"));
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const updateProfile = asyncHandler(async (req, res) => {
  const { fullName, email, phoneNumber, bio, skills } = req.body;
  // console.log(fullName, email, phoneNumber, bio, skills);
  let password = req.body?.password;

  if (password) {
    password = await bcrypt.hash(password, 10);
  }

  let resume;
  if (req.file) {
    resume = await uploadOnCloudinary(
      req.file?.buffer,
      req.file?.originalname
    );
  }

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
        ...(password && { password }),
        ...(phoneNumber && { phoneNumber }),
        ...(bio && { "profile.bio": bio }),
        ...(skillsArray && { "profile.skills": skillsArray }),
        ...(resume && { "profile.resume": resume.url }),
      },
    },
    { new: true }
  ).select("-password");

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

  const profilePhoto = await uploadOnCloudinary(
    req.file.buffer,
    req.file.originalname
  );
  const profilePhoto_id = profilePhoto.public_id;

  if (!profilePhoto) {
    throw new ApiError(400, "Error while uploading profile photo");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        "profile.profilePhoto": profilePhoto.url,
        "profile.profilePhoto_id": profilePhoto_id,
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
  googleCallback,
  handleLoginSuccess,
};
