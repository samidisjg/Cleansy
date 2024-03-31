import Comment from "../../models/IT22577160_Models/comment.model_02.js";
import { errorHandler } from "../../utils/error.js";

export const createComment = async (req, res) => {
   try {
      const { content, resourceId, userId } = req.body;
      if(userId !== req.user.id) {
         return next(errorHandler(403, "You are not authorized to create this comment"))
      }

      const newComment = new Comment({
         content,
         resourceId,
         userId
      });

      await newComment.save();
      res.status(200).json(newComment);
   } catch (error) {
      next(error);
   }
};