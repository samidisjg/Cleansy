import mongoose from "mongoose";

const TaskAnalysisSchema = new mongoose.Schema({
  TaskID: {
      type: String,
      required: true,
   },
   type: {
      type: String,
      required: true,
   },
   NumTasks: {
      type: Number,
      required: true,
   },
 
}, {timestamps:true});


const TaskAnalysisModel = mongoose.model('TaskAnalysis', TaskAnalysisSchema);
export default TaskAnalysisModel;