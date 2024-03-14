import RequestLeave from "../../models/IT22603418_Models/RequestLeave.model_04.js";

export const createRequestLeave = async (req, res, next) => {
   try {
      const newRequestLeave = await  RequestLeave.create(req.body);
      return res.status(201).json(newRequestLeave);
   } catch (error) {
      next(error);
   }
}