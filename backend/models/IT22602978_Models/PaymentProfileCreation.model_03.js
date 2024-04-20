import mongoose from "mongoose";

const PaymentProfileCreationSchema = new mongoose.Schema({
    PaymentProfileName: {
        type: String,
        required: true,
    },
    OwnerId: {
        type: String,
        required: true,
    },
    ownerUsername: {
        type: String,
        required: true,
    },
    ownerhousenumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }




}, {timestamps:true});

const PaymentProfileCreation = mongoose.model('PaymentProfileCreation', PaymentProfileCreationSchema);
export default PaymentProfileCreation;