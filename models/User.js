import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, "first name is required"]
    },
    lastName: {
        type: String,
        required: [true, "last name is required"]
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, "Email is not provided"],
    },
    phone: {
        type: Number,
        required: [true, "Phone number is required"]
    },
    dateOfBirth: {
        type: String,
        required: [true, "Date of birth is required"]
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Others"],
        required: [true, "Select Gender"]
    },
    profession : {
        type: String,
    },
    userImg: {
        type: String,
    }, 
    nin: {
        type: Number,
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    }

}, {timestamps: true})

const Users = mongoose.model("Users", userSchema);

export default Users