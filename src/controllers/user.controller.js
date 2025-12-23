import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // res.status(200).json({
    //     message: "ok"
    // })

    const {fullname , username , email , password } = req.body;
    console.log("email: ", email);

    if(
        [fullname, username, email, password].some((field) => field?.trim()=== "")
    ){
        throw new ApiError(400, "All fileds are required");
    }

    const existeduser = User.findOne({
        $or: [{username}, {email}, {password}]
    })

    if(existeduser){
        throw new ApiError(409, "user already existed")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverimage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverimage = coverImageLocalPath(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(500, "Failed to upload avatar image");
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverimage: coverimage?.ur || "",
        username: username.toLowerCase(),
        email,
        password
    })

    const createdUser = await User.findById(user._id).select("-password -refreshTokens");

    if(!createdUser){
        throw new ApiError(500, "Failed to create user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User created successfully")
    )
} )


export {registerUser};