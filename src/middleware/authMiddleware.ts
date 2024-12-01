
import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

export interface authRequest extends Request{
    user?: mongoose.Types.ObjectId
}
interface JwtPayload {
    _id: string; 
  }
  
export const authMiddleware = (req:authRequest,res:Response,next:NextFunction): void =>{
    const token = req.cookies.token
    if(!token){
        res.status(401).json({message: 'token is not correct'})
        return
    }
    
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string) as JwtPayload
        req.user = new mongoose.Types.ObjectId(decoded._id)
        console.log(req.user);
        next()
    } catch (error) {
        res.status(401).json({message: 'token is not valid'})
        console.log(error);
    }
}
