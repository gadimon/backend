import Jwt from "jsonwebtoken";

export const genarateToken = (_id : string):string =>{
    return Jwt.sign({_id},process.env.TOKEN_SECRET as string, {expiresIn:'1h'})
}