import Addpayment from "../../models/IT22602978_Models/PaymentProfileCreation.model_03.js";

export const PaymentProfile = async (req, res, next) => {
   try {
      const newAddpayment = await  Addpayment.create(req.body);
      return res.status(201).json(newAddpayment);
   } catch (error) {
      next(error);
   }
}