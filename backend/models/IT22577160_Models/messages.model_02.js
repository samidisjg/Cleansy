import mongoose from "mongoose";

const MessagesSchema = new mongoose.Schema({
   conversationId: {
      type: String
   },
   text: {
      type: String,
   },
   sender: {
      type: String
   },
}, {timestamps:true});

const Messages = mongoose.model('Messages', MessagesSchema);
export default Messages;