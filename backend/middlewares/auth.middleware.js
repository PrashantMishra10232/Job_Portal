import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import JsonWebToken from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decoded = JsonWebToken.decode(token);

    const decodedToken = JsonWebToken.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      throw new ApiError(401, "Invalid or expired access token");
    }

    console.error("JWT verification error:", error);
    throw new ApiError(500, "Internal Server Error");
  }
});
