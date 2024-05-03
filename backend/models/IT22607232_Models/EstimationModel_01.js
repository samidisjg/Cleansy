import mongoose from "mongoose";

const EstimationSchema = new mongoose.Schema(
  {
    TaskID: {
      type: String,
      required: true,
    },
    DurationDays: {
      type: Number,
      required: true,
    },
    Category: {
      type: String,
      required: true,
    },
    Size: {
      type: Number,
      required: true,
    },
    Complexity: {
      type: String,
      required: true,
    },
  estimationCost: { 
      type: Number,
      required: true,
    },
    estimatedManHours: { 
      type: Number,
      required: true,
    },
    PersonnelCapability: {
      type: Number,
      required: true,
    },
    RiskFactor: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Estimation = mongoose.model("estimations1", EstimationSchema);
export default Estimation;
