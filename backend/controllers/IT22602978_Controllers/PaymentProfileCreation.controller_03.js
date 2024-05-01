import Addpayment from "../../models/IT22602978_Models/PaymentProfileCreation.model_03.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../../utils/error.js";

export const CreatePaymentProfile = async (req, res, next) => {
   const { PaymentProfileName,OwnerId, ownerUsername, ownerhousenumber, password } = req.body;

   const hashedPassword1 = bcryptjs.hashSync(password, 10);

   const newAddpayment1 = new Addpayment({
      PaymentProfileName,
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
   

      if(req.user.Username !== req.params.username){
         return res.status(400).json({message:"username is not matching"});
      }
      if(!req.params.username){  
         return res.status(400).json({message:"username is required"});
      }
      


      try{
         const payment = await Addpayment.find({ownerUsername:req.params.username});
         return res.status(200).json(payment);
      }catch(error){
         next(error);
      }
   
   

}

//get payment profile by id
export const getPaymentProfileone = async (req, res, next) => {
   try{
      
      const payment = await Addpayment.find({_id:req.params.id});
      return res.status(200).json(payment);
   }
   catch(error){
      next(error);
   }
}
   

//navigate payment profile
   export const navigatepaymentprofile = async (req, res, next) => {
      try{
         
         const payment = await Addpayment.findById({_id:req.params.id});
         return res.status(200).json(payment);
      }
      catch(error){
         next(error);
      }

}
//update payment profile
export const updatepaymentprofile = async (req, res, next) => {
   
   try {
      const updatedpayment = await Addpayment.findByIdAndUpdate(req.params.id, {
         $set:{
            PaymentProfileName:req.body.PaymentProfileName,
            ownerhousenumber:req.body.ownerhousenumber,
            password:req.body.password,
         }
      
      }, { new: true });
      return res.status(201).json(updatedpayment);
   } catch (error) {
      next(error);
   }
}  

export const DeletePaymentProfile = async (req, res, next) => {
   try {
     
      
      await Addpayment.findByIdAndDelete(req.params.id);
      res.json({ success: true });
  } catch (error) {
      console.error('Error deleting payment profile:', error);
      res.status(500).json({ success: false, message: 'Failed to delete payment profile' });
  }
}

