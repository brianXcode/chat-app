import Users from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateToken from "../handlers/handle_auth.js";

const registerUsers = async (req, res) => {

    try{

        const {firstName, lastName, phone, profession, nin, userImg, username, email, password, gender} = req.body;
        if(!firstName || !lastName || !phone || !profession || !nin || !userImg || !username || !email || !password || !gender){
             return res.status(401).json({message: "Complete all fields"});
         }

         const emailFormat = /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

         if(!email.match(emailFormat)){
            return res.status(403).json({msg: "Provide a valid email"});
         }

         if(password.length < 6){
            return res.status(403).json({msg: "Your password should be more than 6 charaters"})
         }

         const user = await Users.findOne({email: email}).exec();

         if (user) {
            return res.status(403).json({msg: "Email already exists"})
         }

        // (generate a salt and hash on separate function calls):
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS)); 
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await Users.create({
            username: username,
            email: email,
            password: hashedPassword,
            gender: gender,
            firstName: firstName,
            lastName: lastName,
            nin: nin,
            profession: profession,
            userImg: userImg,  
        });

        await newUser.save();
        return res.status(201).json({msg: "Account successfully created"});

    }catch(e){
        console.log(e);
        res.status(500).json({msg: "Internal Server Error"});
    }

}

const userLogin = async (req, res) => {

    try{
        const {username, password} = req.body;
        if(!username || !password) {
            return res.status(401).json({msg: "Complete all fields"});
        }

        const user = await Users.findOne({username:username}).exec();

        if(!user){
            return res.status(401).json({msg: "Account does not exits"});
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword){
            return res.status(401).json({msg: "Invalid password"})
        }

        const payload = {
            user: user.username,
            email: user.email,
        }

        const accessToken = await generateToken(payload);
        const refreshToken = await jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

       console.log(accessToken);

        return res.status(200).json({
            msg: "Successfully log in", 
            accessToken: accessToken, 
            refreshToken: refreshToken});


    }catch(err){
        console.log(err);
        return res.status(500).json({msg:"Internal Server Error"});
    }
}

const getAUser = async (req, res) => {

    try{
        const {userId} = req.params;
        if(!userId) return res.status(404).jsons({msg: "User ID not found"});
    
        const user = await Users.findOne({_id: userId}).exec();

        if(!user){
            return res.status(401).json({msg: "User does not exists"});
        }

        return res.status(200).json({msg: "User account retrieved", data: user});

    }catch(err){

        console.log(err);
        return res.status(500).json({msg: "Internal Server Error"});
    }



}

const updateAccount = async(req, res) => {

    try{
        const {userId} = req.params;
        if(!userId) return res.status(404).jsons({msg: "User ID not found"});
    
        const user = await Users.findOne({_id: userId}).exec();
    
        if(!user){
            return res.status(401).json({msg: "User does not exists"});
        }
        updateUser = {
            firstName,
            lastname,
            dateOfBirth, 
        } = req.body;

        const updatedAccount = await Users.findOneAndUpdate(user, updateUser, {new: true} );
        return res.status(200).json({msg: "Account successfully updated", data: updatedAccount});

    }catch(err){
        console.log(err);
        return res.status(500).json({msg: "Internal Server Error"});
    }
}

const deleteUser = async(req, res) => {
    try{
        const {userId} = req.params;

        if(!userId) return res.status(404).jsons({msg: "User ID not found"});
    
        const user = await Users.findOneAndDelete({_id: userId}).exec();

        return res.status(200).json({msg: "Account successfully deleted"});

    }catch(err){
        console.log(err);
        return res.status(500).json({msg: "Internal Server Error"});
    }
    
}

export {
    registerUsers, 
    userLogin, 
    updateAccount, 
    deleteUser,
    getAUser
    };