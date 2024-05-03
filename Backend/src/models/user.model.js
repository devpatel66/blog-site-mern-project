import mongoose,{Schema, Types} from 'mongoose'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const userSchema = Schema({
    fullname :{
        type : String,
        required : true,
        trim : true
    },
    username : {
        type : String,
        required : true,
        trim : true,
        lowercase : true 
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
        trim : true
    },
    avatar : {
        type : String,
    },
    refreshToken : {
        type : String
    }

},{timestamps : true})

userSchema.pre('save',async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
        next();
    }
})

userSchema.methods.isPassword = async function(password){
    const encryptedPassword = this.password
    return await bcrypt.compare(password,encryptedPassword)
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            fullname : this.fullname,
            username : this.username
        },
        process.env.ACCESS_TOKEN_KEY,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_KEY,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}

export const User = mongoose.model("user",userSchema);