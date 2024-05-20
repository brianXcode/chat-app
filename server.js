import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";


//import modules
import connnectdb from "./configs/connectDb.js";
import authMiddleware from "./middlewares/auth.js"
import userRouter from "./routes/user_routes.js";
import broadcastRouter from "./routes/broadcast_routes.js";
import postRouter from "./routes/post_routes.js";


const app = express();
dotenv.config();

//Prevent cross site attack XSS
app.use(helmet());

//package middlewares to parse json data and encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = parseInt(process.env.PORT) || 9000;

//use morgan on development
if(process.env.MORGAN != 'production'){
    app.use(morgan("dev"))
}

//urls
//[authMiddleware],
app.use('/v1/api/users',  userRouter); // urls for user auth
app.use('/v1/api/posts', postRouter); // urls for posts
app.use('/v1/api/broadcasts', broadcastRouter); //urls for broadcasted recordings

//Application listen on the provide port in env file
app.listen(port, async () => {
    await connnectdb(process.env.MONGODB_URL)
    console.log(`Server is running at ${port}...`);
});



