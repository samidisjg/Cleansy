import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
   
    // Rating field
    Ratings: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

const TaskRating = mongoose.model('TaskRating', TaskSchema);
export default TaskRating;
