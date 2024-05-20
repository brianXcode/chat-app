import mongoose from "mongoose";


const broadcastSchema = new mongoose.Schema({
    recording: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

const Broadcast = mongoose.model("Broadcast", broadcastSchema);

export default Broadcast;