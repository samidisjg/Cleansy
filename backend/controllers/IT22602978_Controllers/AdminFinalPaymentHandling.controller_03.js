import FinalPayment from '../../models/IT22602978_Models/AdminFinalPaymentsHandling.model_03.js';

//insert the all payments
export const AdminFinalPayments = async (req, res, next) => {
    try {
        const data = req.body;

        // Iterate over each document in the request body
        for (const doc of data) {
            // Find a document in the database with the same uniqueid
            const existingPayment = await FinalPayment.findOne({ uniqueid: doc._id });

            if (existingPayment) {
                // If a document with the same uniqueid exists, update it
                await FinalPayment.findByIdAndUpdate(existingPayment._id, { ...doc, _id: existingPayment._id });
            } else {
                // If no document with the same uniqueid exists, create a new one
                await FinalPayment.create({ ...doc, uniqueid: doc._id });
            }
        }

        res.status(201).send({ success: true, message: 'Payment profiles added/updated successfully', count: data.length });
    } catch (error) {
        next(error);
    }
}


//get all payments
export const getAdminFinalPayments = async (req, res, next) => {
    try {
        const payments = await FinalPayment.find();

        res.status(200).send(payments);
    } catch (error) {
        next(error);
    }
}


export const getoutstandigBalance = async (req, res, next) => {
    try {
        const payments = await FinalPayment.find({ HouseID: req.params.houseid }).sort({ createdAt: -1 });
        if (payments.length > 0) {
            const OutstandingAmount = payments[0].OutstandingAmount;
            return res.status(200).json({ OutstandingAmount });
        } else {
            return res.status(404).json({ message: "No payments found for the provided house ID." });
        }
    } catch (error) {
        next(error);
    }
}
