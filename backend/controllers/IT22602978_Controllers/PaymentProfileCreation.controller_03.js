import Addpayment from "../../models/IT22602978_Models/PaymentProfileCreation.model_03.js";
import bcryptjs from "bcryptjs";

export const CreatePaymentProfile = async (req, res, next) => {
   const { OwnerId, ownerUsername, ownerhousenumber, password } = req.body;

   const hashedPassword1 = bcryptjs.hashSync(password, 10);
   const newAddpayment1 = new Addpayment({
      OwnerId,
      ownerUsername,
      ownerhousenumber,
      password: hashedPassword1,
   });
   try {
      const newaddpayment=await newAddpayment1.save();
      return res.status(201).json(newaddpayment);
      
   } catch (error) {
      next(error);
   }
}
