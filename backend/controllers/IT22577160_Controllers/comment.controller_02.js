import Comment from "../../models/IT22577160_Models/comment.model_02.js";
import User from "../../models/user.model.js";
import { errorHandler } from "../../utils/error.js";

// Create a new comment
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

// Get all comments for a post
export const getPostComments = async (req, res, next) => {
   try {
      const comments = await Comment.find({ resourceId: req.params.resourceId }).sort({ createdAt: -1 });
      res.status(200).json(comments);
   } catch (error) {
      next(error);
   }
};

// Get all comments for a user
export const getUserComments = async (req, res, next) => {
   try {
      const user = await User.findById(req.params.userId);
      if(!user) {
         return next(errorHandler(404, "User not found"));
      }
      const {password, ...rest} = user._doc;
      res.status(200).json(rest);
   } catch (error) {
      next(error);
   }
};