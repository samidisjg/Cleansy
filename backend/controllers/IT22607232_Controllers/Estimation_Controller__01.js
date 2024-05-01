import Estimation from '../../models/IT22607232_Models/EstimationModel_01.js';

export const InputParameters = async(req,res,next) =>{
    try{
        const newInput = await Estimation.create(req.body);

        if(!newInput){
            return res.status(404).json({ msg: "Task Input failed!!"});
        }
        return res
        .status(200)
        .json({ estimation1: newInput, msg: "Task Input success"});
    }catch (error){
        next(error);
    }
};



// Function to get all input data
export const allInputs = async () => {
    try {
        const inputFind = await Estimation.find();
        return inputFind;
    } catch (error) {
        throw error;
    }
};



// Define COCOMO constants
const COCOMO_CONSTANTS = {
    a: 2.4,
    b: 1.05
};

// Mapping of qualitative complexity levels to numeric values
const complexityValues = {
    "Low": 1,
    "Medium": 2,
    "High": 3
};

// Function to calculate effort using COCOMO equation
function calculateEffort(size) {
    const { a, b } = COCOMO_CONSTANTS;
    return a * Math.pow(size, b);
}

// Function to convert qualitative complexity to numeric value
function getComplexityValue(complexity) {
    return complexityValues[complexity];
}

// Function to estimate cost
export const estimateCost = async () => {
    try {
        // Call allInputs function to get input data
        const allInputsData = await allInputs();

        // Perform cost estimation based on input data...

        // Return the total cost
        return totalCost;
    } catch (error) {
        console.error("Error occurred while estimating cost:", error);
        throw error;
    }
};

// Route handler or controller function for estimating cost
export const estimateCostController = async (req, res, next) => {
    try {
        const totalCost = await estimateCost();
        return res.status(200).json({ totalCost });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};