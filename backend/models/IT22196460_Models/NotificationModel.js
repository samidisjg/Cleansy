import mongoose from "mongoose";
const Schema = mongoose.Schema;

const NotificationSchema = new Schema ({

    Notification_title: {
        type: String,
        required: true
    },
    Notification_content: {
        type: String,
        required: true
    },
    Notification_createdAt: {
        type: Date,
        default: Date.now
    },
    Notification_title: {
        type: String,
        required: true
    },
    deliveryChannel: {
        type: String,
        enum: ['email', 'push', 'sms'], 
        required: true
    },
    receivedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Notification = mongoose.model('Notification', NotificationSchema);
export default Notification;