import {asyncHandler} from "../../../services/errorHandlling.js";
import userModel from "../../../../DB/model/User.model.js";
import messageModel from "../../../../DB/model/Message.model.js";

export const getMessages = async (req, res) => {
    const messageList = await messageModel.find({receiverId:req.id})
    return res.json({ message:"success",messageList });
}

export const sendMessage = asyncHandler(async (req, res) => {
    const { receiverId } = req.params;
    const { message } = req.body;

    const user = await userModel.findById(receiverId);
    if (!user) {
        return res.status(404).json({message:"invalid account id"})
    }

    const createMessage = await messageModel.create({receiverId,message})
    return res.status(201).json({message:"success",createMessage});
})

export const deleteMessage = async (req,res)=> {
    const id = req.id
    const { messageId } = req.params
    
    const message = await messageModel.deleteOne({ _id: messageId, receiverId: id })
    if (message.deletedCount==0) {
        return res.status(400).json({message: "invalid user Id or message Id"})
    }
    return res.json({message:"success"})
}
