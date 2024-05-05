import mongoose from 'mongoose';

const AdminAddPaymentHandlingSchema = new mongoose.Schema({
    PaymentID: {
        type: String,
        required: true
        
    },
    UserID: {
        type: String,
        required: true
        
    },
    HouseID: {
        type: String,
        required: true
        
    },
     paidAmount: {
        type: String,
        required: true
        
    },
    PaymentDate: {
        type: String,
        required: true
        
    },
    PaymentStatus: {
        type: String,
        required: true
        
    },
    PaymentMethod: {
        type: String,
        required: true
        
    },
}, {timestamps:true});

const AdminAddPaymentsHandling = mongoose.model('AdminAddPaymentHandling', AdminAddPaymentHandlingSchema);
export default AdminAddPaymentsHandling;