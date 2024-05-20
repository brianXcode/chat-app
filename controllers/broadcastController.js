import Broadcast from "../models/BroadCast.js";

const createBroadcast = async (req, res) => {
    try{
        const {broadcasts} = req.body;
        if(!broadcasts) {
            return res.status(404).json({msg: "broadcast does not exists"});
        }

        const broadcast = await Broadcast.create({
            recording: broadcasts
        });

        await broadcast.save();
        return res.status(200).json({msg: "Audio successfully recorded"});

    }catch(err){
        console.log(err);
        return res.status(500).json({msg: "Internal Server Error"});
        
    }

}

export {createBroadcast};