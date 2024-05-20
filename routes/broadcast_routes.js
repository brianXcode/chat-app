import express from "express";
const broadcastRouter = express.Router();

import { createBroadcast } from "../controllers/broadcastController.js";

broadcastRouter.route("/create-broadcast").post(createBroadcast); // create a recording

export default broadcastRouter;