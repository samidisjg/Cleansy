import AdminPayment from '../../models/IT22602978_Models/AdminAddPaymentsHandling.model_03.js';

export const AdminAddPayments = async (req, res, next) => {
  try {
    const data = req.body; 

    await AdminPayment.insertMany(data).then((result) => {
      if(result.length > 0){
        res.status(201).send({success: true, message: 'Payment profiles added successfully', count: result.length});
      } else {
        res.status(400).send({success: false, message: 'Failed to add payment profiles'});
      }
    });

  } catch (error) {
    next(error); 
  }
}
//get all data 
export const AdminAddFinalPayments= async (req, res, next) => {
  try{
    const Addpaymentsget = await AdminPayment.find();
    return res.status(200).json(Addpaymentsget);

  }catch(error){
    next(error);
  }
}


