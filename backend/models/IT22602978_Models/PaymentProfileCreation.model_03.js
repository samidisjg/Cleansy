import mongoose from "mongoose";

const PaymentProfileCreationSchema = new mongoose.Schema({
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
    },
    codeString: {
        type: String,
        required: true,
    },




}, {timestamps:true});

const PaymentProfileCreation = mongoose.model('PaymentProfileCreation', PaymentProfileCreationSchema);
export default PaymentProfileCreation;