import mongoose from "mongoose";

const TaskCategorySchema = new mongoose.Schema({
   type:{
      type: String,
      required: true
   },
   color:{
      type: String,
      required: true
   }
}, {timestamps:true});


const TaskCategoryModel = mongoose.model('TaskCategory', TaskCategorySchema);
export default TaskCategoryModel;