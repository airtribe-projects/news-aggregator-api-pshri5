import jwt from 'jsonwebtoken'
import { User } from '../models/user.model'

export const verifyJWT = async(req,res,next) =>{
    const token = req.cookies?.accessToken

    const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findById(decodedToken?._id)

    req.user = user
    next()
}