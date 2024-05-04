//backend\models\IT22196460_Models\AnnouncementModel.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AnnouncementSchema = new Schema({
    Announcement_ID: {
        type: String,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Content: {
        type: String,
        required: true
    },
    Category_ID: {
        type: String,
        required: true
    },
    Attachment_URL: {
        type: String,
        required: true
    },
    Create_At: {
        type: Date,
        required: true
    },
    
    
});


const Announcement = mongoose.model('Announcement', AnnouncementSchema);
export default Announcement;