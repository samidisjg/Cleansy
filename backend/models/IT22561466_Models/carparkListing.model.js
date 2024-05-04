import mongoose from 'mongoose';

const carparkListingSchema = new mongoose.Schema (
    {
        ownerName:{
            type: String,
            required: true,
        },        
        email:{
            type: String,
            required: true,
        },
        telNo:{
            type: String,
            required: true,
        },  
        vehicleType:{
            type: String,
            required: true,
        },
        vehicleNum:{
            type: String,
            required: true,
        },
        nic:{
            type: String,
            required: true,
        },
        slotId:{
            type:Number,
        },
        userRef:{
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const carparkListing = mongoose.model('carparkListing', carparkListingSchema);

export default carparkListing;