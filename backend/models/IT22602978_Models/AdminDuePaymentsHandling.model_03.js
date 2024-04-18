import mongoose from 'mongoose';

const AdminDuePaymentHandlingSchema = new mongoose.Schema({
    BillID: {
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
    dueAmount: {
        type: String,
        required: true
        
    },
    MaintenanceFee: {
        type: String,
        required: true
    },
    PenaltyFee: {
        type: String,
        required: true
    },
    StartDate:{
        type:String,
        required:true

    },
    EndDate:{
        type:String,
        required:true

    },
    BillStatus: {
        type: String,
        required: true
        
    },
   
   
    
    




}, {timestamps:true});

const AdminDuePaymentsHandling = mongoose.model('AdminDuePaymentHandling', AdminDuePaymentHandlingSchema);
export default AdminDuePaymentsHandling;