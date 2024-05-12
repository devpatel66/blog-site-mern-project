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
        return res.status(404).json(
            new ApiResponse(404,"","Fullname required")
        )
    }

    if(username == ""){
        return res.status(405).json(
            new ApiResponse(405,"","Username required")
        )
    }

    if(email == ""){
        return res.status(400).json(
            new ApiResponse(400,"","Email required")
        )
    }

    if(password == ""){
        return res.status(403).json(
            new ApiResponse(403,"","Password required")
        )
    }

    if(String(password).length <= 7){
        return res.status(403).json(
            new ApiResponse(403,"","Password must be more than 7 letters")
        )
    }


    // checking if the user is already exist 

    const existedUserName = await User.findOne({username})
    const existedEmail = await User.findOne({email})

    if(existedEmail){
        return res.status(400).json(
            new ApiResponse(400,"","Email already exists")
        )
    }
    
    if(existedUserName){
        return res.status(405).json(
            new ApiResponse(405,"","Username already exits")
        )
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

    if(!user){
        return res.status(500).json(
            new ApiResponse(500,"","Internal Server Error")
        )
    }

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
    domain: 'demo.blogis.com',
    httpOnly : true,
    secure : true
}

//login controller 
const loginUser = asyncHandler(async (req,res)=>{
    const {username,email,password} = req.body;
    console.log(req.body)
    if(!(username || email)){
        return res.status(402)
        .json(
            new ApiResponse(402,"","Username or Email required")
        )
    }

    if(!password){
        return res.status(403)
        .json(
            new ApiResponse(403,"","Password required")
        )
    }

    const user = await User.findOne({
        $or : [{username},{email}]
    })

    // console.log(user)
    if(!user){
        return res.status(401)
        .json(
            new ApiResponse(401,"","User does not exits check your Email or Username")
        )
    }
    const isPasswordvalid = await user.isPassword(password)

    if(!isPasswordvalid){
        return res.status(403)
        .json(
            new ApiResponse(403,"","Invalid Password")
        )
    }

    const {accessToken,refreshToken} = await generateTokens(user._id);

    const loggedInUser = await User.findOne(user._id).select("-password -refreshTOken")


    res.cookie("accessToken",accessToken,options)
    return res.status(200)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,{accessToken,refreshToken,user:loggedInUser},"User logged in successfully")
    )

})

export {
    registeredUser,
    loginUser
}