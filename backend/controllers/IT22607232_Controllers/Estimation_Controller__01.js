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



//Get Inputs that entered
export const allInputs = async (req, res, next) => {
    try {
      const inputFind = await Estimation.find();
      if (!inputFind) {
        return res.status(404).json({ msg: "Input details not found" });
      }
      return res.status(200).json(inputFind);
    } catch (error) {
        next(error);
      res.status(500).json({ error: error });
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

export const estimateCost = async () => {
    try {
        // Call allInputs function to get input data
        const allInputsData = await allInputs();

        // Assuming size of the task is proportional to duration and complexity
        const size = allInputsData.DurationDays * getComplexityValue(allInputsData.Complexity);

        // Calculate effort using COCOMO equation
        const effort = calculateEffort(size);

        // Define your cost allocation rules here
        // For simplicity, let's assume a fixed cost per unit of effort
        const costPerEffortUnit = 100; // $100 per unit of effort

        // Calculate total cost
        const totalCost = effort * costPerEffortUnit;

        // Create a new instance of the Estimation model
        const newEstimation = new Estimation({
            TaskID: allInputsData.TaskID,
            DurationDays: allInputsData.DurationDays,
            Category: allInputsData.Category,
            Size: allInputsData.Size,
            Complexity: allInputsData.Complexity,
            totalCost: totalCost // Assign the total cost directly here
        });

        // Save the estimation data to the database
        await newEstimation.save();

        return totalCost;
    } catch (error) {
        // Handle any errors that occur during estimation or saving to the database
        console.error("Error occurred while estimating cost:", error);
        throw error; // Rethrow the error to propagate it to the caller
    }
};