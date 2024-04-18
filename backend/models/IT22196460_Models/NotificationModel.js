// models/notificationModel.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
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

module.exports = Notification;
