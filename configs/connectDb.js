import mongoose from "mongoose"

const connectdb = (url) => {
    mongoose.connect(url, ).then(() => {
        console.log("Database connected successfully");
    }).catch(error => console.log(`connection failed, error: ${error}`));
}

export default connectdb;