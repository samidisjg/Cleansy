import mongoose from "mongoose";

const EstimationSchema = new mongoose.Schema({
  TaskID: {
      type: String,
      required: true
   },
   DurationDays: {
    type: Number,
    required: true
 },
   Category: {
      type: String,
      required: true
   },

   Size:{
    type: Number
   },
   complexity:{
    type: String,
    required:true
   }
}, {timestamps:true});


const Estimation = mongoose.model('Estimation', EstimationSchema);
export default Estimation;