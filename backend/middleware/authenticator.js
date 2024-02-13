import jwt from "jsonwebtoken";


export const authenticate_token = (req,res,next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];
    
    if(!token){
        return res.status(401).send({message : "access token is missing"});
    }

    jwt.verify(token,process.env.secret_key,(err,user) => {
        if(err){
            return res.status(403).send({message:"invlaid token"})
        }
        req.user = user;
        next()
    })   
}

export default authenticate_token;