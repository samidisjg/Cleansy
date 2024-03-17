import Addpayment from "../../models/IT22602978_Models/PaymentProfileCreation.model_03.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../../utils/error.js";

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

//get paymet profiles
export const getPaymentProfile = async (req, res, next) => {
      try{
         const payment = await Addpayment.find({ownerUsername:req.params.username});
         return res.status(200).json(payment);
      }catch(error){
         next(error);
      }
   

}
//update payment profile
export const updatepaymentprofile = async (req, res, next) => {
   
   req.body.password = bcryptjs.hashSync(req.body.password, 10);

   
   try {
      const updatedpayment = await Addpayment.findByIdAndUpdate(req.params.id, {
         $set:{
            ownerhousenumber:req.body.ownerhousenumber,
            password:req.body.password,
         }
      
      }, { new: true });
      return res.status(200).json(updatedpayment);
   } catch (error) {
      next(error);
   }
}  

