import express from "express";
const postRouter = express.Router();
import { 
    getAllPosts, 
    getAPost, 
    createPost,
    updatePosts,
    deletePost } from "../controllers/postsController.js";

postRouter.route("/get-all-posts").get(getAllPosts) //get all posts
postRouter.route("/get-a-post/:id").get(getAPost) //get a post
postRouter.route("/create-a-post").post(createPost) //create a post
postRouter.route("/update-a-post/:id").patch(updatePosts) //update a post
postRouter.route("/delete-a-post/:id").delete(deletePost) //delete a post

export default postRouter;