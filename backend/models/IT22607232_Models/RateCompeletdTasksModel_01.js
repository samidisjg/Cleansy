import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    Status: {
        type: String,
        default: "Completed" 
    },
    TaskID: {
        type: String,
        required: true,
    },
    Category: {
        type: String,
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: false,
    },
    WorkGroupID: {
        type: String,
        required: true,
    },
    Location: {
        type: String,
        required: true,
    },
    DurationDays: {
        type: Number,
        required: true,
    },
    // Rating field
    Ratings: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user who rated
        value: { type: Number, required: true },
        review_Text: { type: String, required: false },
        Date: { type: Date, default: Date.now },

    }],
}, { timestamps: true });

const TaskRating = mongoose.model('TaskRating', TaskSchema);
export default TaskRating;
