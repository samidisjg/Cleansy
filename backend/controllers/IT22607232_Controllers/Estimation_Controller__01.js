import Estimation from "../../models/IT22607232_Models/EstimationModel_01.js";

/*export const InputParameters = async (req, res, next) => {
  try {
    const newInput = await Estimation.create(req.body);

    if (!newInput) {
      return res.status(404).json({ msg: "Task Input failed!!" });
    }
    return res
      .status(200)
      .json({ estimation1: newInput, msg: "Task Input success" });
  } catch (error) {
    next(error);
  }
};*/

// Function to calculate personnel capability based on Size, Complexity, and additional factors
function calculatePersonnelCapability(Size, Complexity) {
    let personnelCapability = 1; // Default capability

    // Adjust based on Size and Complexity
    switch (Complexity) {
        case 'Low':
            personnelCapability *= 1.2; 
            break;
        case 'Medium':
            personnelCapability *= 1.0; 
            break;
        case 'High':
            personnelCapability *= 0.8; 
            break;
        default:
            // Do nothing for unknown complexity levels
            break;
    }

    return personnelCapability;
}

// Function to calculate risk factor based on Category
function calculateRiskFactor(Category) {
    let riskFactor = 1; // Default risk factor

    // Adjust based on Category
    switch (Category) {
        case 'Pest-control':
            riskFactor *= 1.5; // Increase risk factor for high-risk categories
            break;
            case 'Elevator':
            riskFactor *= 2.5; 
                break;
            case 'Janitorial':
            riskFactor *= 0.5;
        default:
          riskFactor *= 1.0;
            break;
    }

    return riskFactor;
}

// Function to calculate estimation cost
function calculateEstimationCost(Size, Complexity,personnelCapability, riskFactor) {
    // Define base rates
    const baseRate = 100; // Adjust as needed
    
    // Adjust base rate based on complexity
    let adjustedRate;
    switch (Complexity) {
      case 'Low':
        adjustedRate = baseRate * 0.8;
        break;
      case 'Medium':
        adjustedRate = baseRate * 1.0; // Adjust based on complexity level
        break;
      case 'High':
        adjustedRate = baseRate * 1.2; // Adjust based on complexity level
        break;
      default:
        adjustedRate = baseRate;
    }

    // Apply adjustments based on additional factors
    adjustedRate *= personnelCapability;
    adjustedRate *= riskFactor;
  
    // Calculate estimation cost
    return Size * adjustedRate;
  }
  
  // Function to calculate estimated man-hours
  function calculateEstimatedManHours(Size, durationDays, Complexity, personnelCapability, riskFactor) {
    // Define base rates
    const baseRate = 8; 
  
    // Adjust base rate based on complexity
    let adjustedRate;
    switch (Complexity) {
      case 'Low':
        adjustedRate = baseRate * 0.8; 
        break;
      case 'Medium':
        adjustedRate = baseRate * 1.0; 
        break;
      case 'High':
        adjustedRate = baseRate * 1.2; 
      default:
        adjustedRate = baseRate;
    }

    
    // Apply adjustments based on additional factors
    adjustedRate *= personnelCapability;
    adjustedRate *= riskFactor;
  
    // Calculate estimated man-hours
    return Size * durationDays * adjustedRate;
  }


  
  
  export const InputParameters = async (req, res, next) => {
    try {
      const { TaskID, DurationDays, Category, Size, Complexity } = req.body;
       // Calculate personnel capability and risk factor algorithmically based on the maintenance task parameters
       const personnelCapability = calculatePersonnelCapability(Size, Complexity);
    const riskFactor = calculateRiskFactor(DurationDays, Category);
 

      /*console.log('Received inputs:');
      console.log('Size:', Size);
      console.log('DurationDays:', DurationDays);
      console.log('Complexity:', Complexity);*/
  
      // Create a new input object
      const newInput = new Estimation({
        TaskID,
        DurationDays,
        Category,
        Size,
        Complexity,
        PersonnelCapability: personnelCapability,
        RiskFactor: riskFactor,
      });
  
      // Calculate the estimation cost and estimated man-hours based on the input data and calculated factors
    const estimationCost = calculateEstimationCost(Size, Complexity, personnelCapability, riskFactor);
    const estimatedManHours = calculateEstimatedManHours(Size, DurationDays, Complexity, personnelCapability, riskFactor);
  
      /*console.log('Estimation cost:', estimationCost);
      console.log('Estimated man-hours:', estimatedManHours);*/
  
      // Update the new input object with the estimation cost and estimated man-hours
      newInput.estimationCost = estimationCost;
      newInput.estimatedManHours = estimatedManHours;
  
      // Save the updated input object to the database
      await newInput.save();
  
      // Return a success response with the updated input object
      return res.status(200).json({ estimation1: newInput, msg: "Task Input success" });
    } catch (error) {
      next(error);
    }
  };
  
  
      

export const allInputs = async (req, res, next) => {
    try {
      const inputFind = await Estimation.find().lean(); // Use lean() to return plain JavaScript objects
  
      if (!inputFind || inputFind.length === 0) {
        return res.status(404).json({ msg: "Input details not found" });
      }
      
      return res.status(200).json(inputFind);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };


  //get One Task by TaskID
export const OneEstimation = async (req, res,next) => {
    try {
      let estId = req.params.taskid;
      const OneEstimation1 = await Estimation.findOne({_id: estId});
  
      if (!OneEstimation1) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(200).json(OneEstimation1);
    } catch (error) {
      console.error("Error retrieving task:", error);
      next(error);
      return res.status(500).json({ error: "Internal server error" });
     
    }
  };
  


/*// Function to calculate effort using COCOMO equation
function calculateEffort(size) {
  const COCOMO_CONSTANTS = {
    a: 2.4,
    b: 1.05,
  };
  const { a, b } = COCOMO_CONSTANTS;
  return a * Math.pow(size, b);
}

// Mapping of qualitative complexity levels to numeric values
const complexityValues = {
  Low: 1,
  Medium: 2,
  High: 3,
};

// Function to convert qualitative complexity to numeric value
function getComplexityValue(complexity) {
  return complexityValues[complexity];
}


// Function to estimate cost
export const estimateCost = async (allInputsData) => {
  let totalCost = 0;
  for (const input of allInputsData) {
    const { Size, Complexity } = input;
    const size = parseInt(Size);
    const complexity = getComplexityValue(Complexity);
    const effort = calculateEffort(size);
    totalCost += effort * complexity;
  }
  return totalCost;
};

export const estimateCostController = async (req, res, next) => {
    try {
      const allInputsData = await Estimation.find().lean();
  
      // Ensure allInputsData is always an array
      const dataArray = Array.isArray(allInputsData) ? allInputsData : [allInputsData];
  
      // Calculate total cost
      const totalCost = await estimateCost(dataArray);
      
      // Return the total cost
      return res.status(200).json({ totalCost });
    } catch (error) {
      // Handle errors
      return res.status(500).json({ error: error.message });
    }
  };*/
  