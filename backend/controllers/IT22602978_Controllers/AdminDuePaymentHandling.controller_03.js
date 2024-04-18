import AdminDuePayment from '../../models/IT22602978_Models/AdminDuePaymentsHandling.model_03.js';

export const AdminDuePayments = async (req, res, next) => {
  try {
    const data = req.body; 

    await AdminDuePayment.insertMany(data).then((result) => {
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
export const AdminDueFinalPayments= async (req, res, next) => {
  try{
    const Duepaymentsget = await AdminDuePayment.find();
    return res.status(200).json(Duepaymentsget);

  }catch(error){
    next(error);
  }
}
