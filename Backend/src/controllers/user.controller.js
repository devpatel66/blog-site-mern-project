import asyncHandler from '../utils/asyncHandler.js'
import Apierror from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import ApiResponse from '../utils/ApiResponse.js';



const registeredUser = asyncHandler(async function(req,res){
    const {fullname,username,email,password} = req.body;
    // const avatarPath =await req.file.path;
    console.log(req.body)
    // console.log(avatarPath)
    if(fullname == ""){
        throw new Apierror(400,"Full name is required")
    }

    if(username == ""){
        throw new Apierror(400,"Username is required")
    }

    if(email == ""){
        throw new Apierror(400,"Email is required")
    }

    if(password == ""){
        throw new Apierror(400,"Password is required")
    }

    if(String(password).length <= 7){
        throw new Apierror(401,"Password length should be more than 7")
    }


    // checking if the user is already exist 

    const existedUserName = await User.findOne({username})
    const existedEmail = await User.findOne({email})

    if(existedEmail){
        throw new Apierror(400,"Email already existed")
    }
    
    if(existedUserName){
        throw new Apierror(400,"Username already taken like your crush !!!")
    }

    // if(!avatarPath){
    //     throw new Apierror("Avatar is requied to upload")
    // }

    


    const userData = {
        fullname,
        username,
        email,
        password,
        refreshToken : "",
        // avatarPath
    }

    const user = await User.create(userData)

    const createdUser = await User.findOne(user._id).select("-password -refreshToken");

    return res.status(200).json(
        new ApiResponse(200,createdUser,"User registered successfully")
    )
})

//generating access token and refreshToken
const generateTokens = async (userId)=>{
    const user =await User.findOne(userId);
    const refreshToken = await user.generateRefreshToken();
    const accessToken = await user.generateAccessToken();
    await User.findOneAndUpdate(userId,{
        $set:{
            refreshToken : refreshToken
        }},
        {
            new : true
        }
    )

    return {accessToken,refreshToken}
}

//cookies options
const options = {
    httpOnly : true,
    secure : true
}

//login controller 
const loginUser = asyncHandler(async (req,res)=>{
    const {username,email,password} = req.body;

    if(!(username || email)){
        throw new Apierror(400,"Username or Email is required")
    }

    if(!password){
        throw new Apierror(400,"Password is required")
    }

    const user = await User.findOne({
        $or : [{username,email}]
    })

    if(!user){
        throw new Apierror(401,"User does not exists")
    }

    const isPasswordvalid = await user.isPassword(password)

    if(!isPasswordvalid){
        throw new Apierror(401,"Invalid password")
    }

    const {accessToken,refreshToken} = await generateTokens(user._id);

    const loggedInUser = await User.findOne(user._id).select("-password -refreshTOken")

    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,{accessToken,refreshToken,user:loggedInUser},"User logged in successfully")
    )

})

export {
    registeredUser
}