import ServiceBooking from "../../models/IT22350114_Models/serviceBookingModel.js";
import sendEmail from "../../utils/sendEmail.js";
import serviceBookingEmailTemplate from "../../utils/email_templates/serviceBookingEmailTemplate.js";

export const createServiceBooking = async (req, res, next) => {
  try {
    const isBookingExist = await ServiceBooking.findOne({
      serviceID: req.body.serviceID,
      bookingDate: req.body.bookingDate,
      bookingTime: req.body.bookingTime,
      bookingStatus: "Confirmed",
    });

    let newServiceBooking = null;
    if (isBookingExist) {
      newServiceBooking = await ServiceBooking.create({
        ...req.body,
        bookingStatus: "Pending",
      });
      const emailTemplate = serviceBookingEmailTemplate(req.body.residentName, {
        ...req.body,
        bookingStatus: "Pending",
        bookingID: newServiceBooking._id, // Pass the booking ID here
      });
     
      sendEmail(
        req.body.residentEmail,
        "Service Booking Confirmation",
        emailTemplate
      );
    } else {
      // Create a new service bookings using the data from the request body
      newServiceBooking = await ServiceBooking.create({
        ...req.body,
        bookingStatus: "Confirmed",
      });
      const emailTemplate = serviceBookingEmailTemplate(req.body.residentName, {
        ...req.body,
        bookingStatus: "Confirmed",
        bookingID: newServiceBooking._id, // Pass the booking ID here
      });
     
      sendEmail(
        req.body.residentEmail,
        "Service Booking Confirmation",
        emailTemplate
      );
    }

    // Send a success response with the newly created service booking
    return res.status(201).json({
      success: true,
      message: "Service booking created successfully",
      serviceBooking: newServiceBooking,
    });
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};

//Read for all service Bookings
export const getAllServiceBookings = async (req, res, next) => {
  try {
    const allServiceBookings = await ServiceBooking.find();
    return res.status(200).json(allServiceBookings);
  } catch (error) {
    next(error);
  }
};

//Fetch a specific service bookings
export const getServiceBookingById = async (req, res, next) => {
  try {
    const { BookingId } = req.params;
    const serviceBooking = await ServiceBooking.findById(BookingId);
    if (!serviceBooking) {
      return res.status(404).json({ message: "Service booking not found" });
    }
    return res.status(200).json(serviceBooking);
  } catch (error) {
    next(error);
  }
};

//Update a service bookings
export const updateServiceBooking = async (req, res, next) => {
  try {
    const { BookingId } = req.params;
    const updateServiceBooking = await ServiceBooking.findByIdAndUpdate(
      BookingId,
      req.body,
      { new: true, upsert: true }
    );
    return res.status(200).json(updateServiceBooking);
  } catch (error) {
    next(error);
  }
};

//Delete a service listing
export const deleteServiceBooking = async (req, res, next) => {
  try {
    const { BookingId } = req.params;
    const deleteServiceBooking = await ServiceBooking.findByIdAndDelete(
      BookingId
    );
    return res.status(200).json(deleteServiceBooking);
  } catch (error) {
    next(error);
  }
};
