import mongoose,{Schema, Types} from 'mongoose'

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
        required : true,
    },
    refreshToken : {
        type : String
    }

},{timestamps : true})

export const User = mongoose.model("user",userSchema);