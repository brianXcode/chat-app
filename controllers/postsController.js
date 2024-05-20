import Posts from "../models/Posts.js";

const getAllPosts = async (req, res) => {
    try{
        const posts = await Posts.find({}).exec();

        if(!posts) return res.status(404).json({msg: "No contents"});

        return res.status(200).json({data: posts});

    }catch(err){
        console.log(err);
        return res.status(500).json({msg: "Internal Server Error"});
    }
}

const getAPost = async (req, res) => {
    try{
        const {postId} = req.params;
        if(!postId) return res.status(404).jsons({msg: "PostId not found"});

        const posts = await Posts.findById(postId).exec();
        if(!posts) return res.status(403).jsons({msg: "Post doesn\'t exists"});

        return res.status(200).json({msg: "Success", data: posts});

    }catch(err){
        console.log(err);
        return res.status(500).json({msg: "Internal Server Error"});
    }
}

const createPost = async (req, res) => {
    try{
        const {imageOrPics, title, content} = req.body;

        if(!imageOrPics || !title || !content){
            return res.status(403).json({msg: "The fields are required"});
        }
    
        const posts = await Posts.create({
            imageOrPics: imageOrPics,
            title: title,
            content: content
        });
    
        await posts.save();
        return res.status(201).json({msg: "You have successfully uploaded your post", data: post});

    }catch(err){
        console.log(err);
        return res.status(500).json({msg: "Internal Server Error"});
    }
}

const updatePosts = async (req, res) => {
    try{
        const { postId } = req.params;
        if(!postId) return res.status(404).jsons({msg: "Post ID not found"});

        const posts = await  Posts.findOne({_id:postId}).exec();

        if(!posts) return res.status(403).json({msg:"Posts does not exits"});

        const updates = {
            imageOrPics: req.imageOrPics,
            title: req.title,
            content: req.content
        }
        const updatedPosts = await Posts.findOneAndUpdate(posts, updates,{new: true} );
        return res.status(200).json({msg: "post succeslly updated", data: updatedPosts});
        
    }catch(err){
        console.log(err);
        return res.status(500).json({msg: "Internal Server Error"});
    }
}

const deletePost = async (req, res) => {
    try{
        const {postId} = req.params;
        if(!postId) return res.status(404).jsons({msg: "Post ID not found"});

        const deletedPost = await Posts.findOneAndDelete({_id: postId});

        if(deletedPost) return res.status(200).json({msg: "Post successfully deleted", data: deletedPost});

    }catch(err){
        console.log(err);
        return res.status(500).json({msg: "Internal Server Error"});
    }
}

export {
    getAllPosts,
    getAPost,
    createPost,
    updatePosts,
    deletePost
}