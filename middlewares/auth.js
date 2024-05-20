import jwt from "jsonwebtoken";


const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if(!authHeader){
        return res.status(401).json({msg: "Invalid authorization header"});
    }
    const token = authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({msg: "Invalid Token"});
    }
     
    await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){
            console.log(err);
            return  res.status(401).json("Unauthorized");
        }
        req.user = user;
        next();
    })


}

export default authMiddleware;