import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        minLength: 6,
    },
    preferences:{
        categories:{
            type: [String],
            default: ['general'],
            enum: ['general','health','science','sport','business','technology','entertainment']
        },
        country:{
            type: String,
            default: 'India',
        }
    },
    savedArticles:[{
        title: String,
        url: String,
        savedAt:{
            type:Date,
            default: Date.now
        }
    }]
},{timestamps: true})

userSchema.pre('save',async function(next){
    if (!this.isModified("password")) return next() //prevents rehashing of password
    
    this.password = await bcrypt.hash(this.password,10)
    next()
})

// comparing the password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
)
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
)
}



export const User = mongoose.model("User",userSchema)