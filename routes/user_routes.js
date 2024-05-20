import express from "express";
const userRouter = express.Router();

import {
     registerUsers, 
     userLogin, 
     updateAccount, 
     deleteUser,
     getAUser
     } from "../controllers/userController.js";

userRouter.route('/register').post(registerUsers); //register user routes
userRouter.route('/login').post(userLogin); //login users routes
userRouter.route('/get-a-user-account').get(getAUser); //get a users account
userRouter.route('/update-user-account/:id').patch(updateAccount); // update user account profile
userRouter.route('/delete-user-account/:id').post(deleteUser); // delete user account profile

export default userRouter;

