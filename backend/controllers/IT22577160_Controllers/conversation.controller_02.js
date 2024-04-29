import Conversation from "../../models/IT22577160_Models/conversation.model_02.js";
import { errorHandler } from "../../utils/error.js";

export const createNewConversation = async (req, res, next) => {
   try {
      const {groupTitle, userId, adminId } = req.body;

      const isConversationExist = await Conversation.findOne({ groupTitle });

      if(isConversationExist) {
         const conversation = isConversationExist;
         return res.status(200).json(conversation);
      } else {
         const newConversation = await Conversation.create({
            members: [userId, adminId],
            groupTitle,
         });
   
         return res.status(201).json(newConversation);
      }

   } catch (error) {
      next(error);
   }
};

// get admin conversation
export const getAdminConversation = async (req, res, next) => {
   try {
      const conversation = await Conversation.find({ 
         members: {
            $in: [req.params.id]
         }
       }).sort({ updatedAt: -1, createdAt: -1 });

      return res.status(201).json(conversation);
   } catch (error) {
      next(error);
   }
};