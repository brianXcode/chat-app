import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    imgOrPics: {
        type: String,
        required: true
    },
    title: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    content: {
        type: String
    }
}, {timestamps: true});

const Posts = mongoose.model("Posts", postSchema);

export default Posts;