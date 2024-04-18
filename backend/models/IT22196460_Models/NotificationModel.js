import mongoose from "mongoose";
const Schema = mongoose.Schema;


const notificationSchema = new Schema({
  message: {
    type: String,
    required: true,
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

