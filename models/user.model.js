import mongoose from "mongoose"
import bcrypt from "bcrypt"


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

userSchema.methods.generateAccessToken = async function(){
    return 
}



export default User = mongoose.model("User",userSchema)