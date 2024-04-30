import mongoose from "mongoose";

const AdminFinalPaymentHandlingSchema = new mongoose.Schema({
    PaymentID: {
        type: String,
        
    },
    StartDate: {
        type: String,
       
    },
    EndDate: {
        type: String,
        
    },

    BillID: {
        type: String,
        
    },
    UserID: {
        type: String,
        
    },
    HouseID: {
        type: String,
        
    },
    paidAmount: {
        type: String,
        
    },
    dueAmount: {
        type: String,
        
    },
    MaintenanceFee: {
        type: String,
        
    },
    PenaltyFee: {
        type: String,
        
    },
    PaymentDate: {
        type: String,
        
    },
    BillStatus: {
        type: String,
        
    },
    PaymentStatus: {
        type: String,
        
    },
    PaymentMethod: {
        type: String,
       
    },
    OutstandingAmount: {
        type: String,
        
    },
    createdAt: {
        type: Date,
        
    },
    updatedAt: {
        type: Date,
       
    },
    uniqueid: {
        type: String,
        
    },
   

    });
    const AdminFinalPaymentsHandling = mongoose.model('AdminFinalPaymentsHandling', AdminFinalPaymentHandlingSchema);
    export default AdminFinalPaymentsHandling;