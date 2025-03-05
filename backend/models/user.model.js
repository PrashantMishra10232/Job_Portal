import mongoose from "mongoose";
import JsonWebToken from "jsonwebtoken";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    fullName: {
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required: true
    },
    role:{
        type:String,
        enum:['Student','Recruiter'],
        required:true
    },
    profile:{
        bio:{
            type:String
        },
        skills:[{type:String}],
        resume:{type:String},//resume url
        resumeOriginalName:{type:String},
        companyy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Company'
        },
        profilePhoto:{
            type:String,
            default:""
        },
        profilePhoto_id:{
            type:String,
            default:""
        }
    },
    refreshToken:{
        type: String
    }
},{timestamps:true})

userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return JsonWebToken.sign(
        {
            _id: this.id,
            fullName:this.fullName,
            email:this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken=function(){
    return JsonWebToken.sign(
        {
          _id:this.id
        },
        process.env.REFRESH_TOKEN_SECRET,
       {
         expiresIn:process.env.REFRESH_TOKEN_EXPIRY
       }
    )
}

export const User = mongoose.model("User",userSchema)