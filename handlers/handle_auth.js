import jwt from "jsonwebtoken";

const generateToken = async (payload) => {
    const token = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.TOKEN_EXP});
    return token;
}

export default generateToken;