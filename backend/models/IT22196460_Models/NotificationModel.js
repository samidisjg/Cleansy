// backend\models\IT22196460_Models\NotificationModel.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  Notification_title: {
    type: String,
    required: true,
  },
  Notification_content: {
    type: String,
    required: true,
  },
  deliveryChannel: {
    type: String,
    required: true,
    enum: ['email']
  },
  recipientType: {
    type: String,
    enum: ['customer', 'staff'],
    required: true,
  },
  recipientId: {
    type: String,
    required: true,
  },
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
