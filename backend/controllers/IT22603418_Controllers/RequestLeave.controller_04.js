import RequestLeave from "../../models/IT22603418_Models/RequestLeave.model_04.js";

export const createRequestLeave = async (req, res, next) => {
   
   try {
      // Create a new RequestLeave instance using the model
      const newRequestLeave = await RequestLeave.create(req.body);

      // Send a successful response with the newly created request leave entry
      return res.status(201).json(newRequestLeave);
   } catch (error) {
      // If an error occurs during the process, pass it to the error handling middleware
      next(error);
   }
}

// export const getRequestLeaveById = async (req, res, next) => {
//    try {
//       // Extract the request leave ID from the request parameters
//       const { id } = req.params;

//       // Use the RequestLeave model to find the request leave entry by ID
//       const requestLeave = await RequestLeave.findById(id);

//       // If the request leave entry is found, send it as a response
//       if (requestLeave) {
//          return res.status(200).json(requestLeave);
//       } else {
//          // If the request leave entry is not found, return a 404 error
//          return res.status(404).json({ message: "Request leave entry not found" });
//       }
//    } catch (error) {
//       // If an error occurs during the process, pass it to the error handling middleware
//       next(error);
//    }
// }

