import Addpayment from "../../models/IT22602978_Models/PaymentProfileCreation.model_03.js";


export const CreatePaymentProfile = async (req, res, next) => {

   try {
      const newaddpayment=await Addpayment.create(req.body);
      return res.status(201).json(newaddpayment);
      
   } catch (error) {
      next(error);
   }
}
