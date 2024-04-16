import AmenitiesBooking from "../../models/IT22003546_Models/amenitiesBooking.model_05.js";

//Book amenity
export const bookAmenity = async (req, res, next) => {
    try {
        const newAmenitiesBooking = await AmenitiesBooking.create(req.body);
        return res.status(201).json({
            success: true,
            message: "Amenity booked successfully",
            amenitiesBooking: newAmenitiesBooking
        });
    } catch (error) {
        next(error);
    }
}

//Get Amenity bookings by ID
export const getAmenityBookingById = async (req, res, next) => {
    try {
        const { bookingId } = req.params;
        const amenityBooking = await AmenitiesBooking.findById(bookingId);
        if (!amenityBooking) {
            return res.status(404).json({ message: "Amenity Booking not found" });
        }
        return res.status(200).json(amenityBooking);
    } catch (error) {
        next(error);
    }
}

//update amenity booking - User
export const updateAmenityBooking = async (req, res, next) => {
    try {
        const { bookingId } = req.params;
        const updateAmenityBooking = await AmenitiesBooking.findByIdAndUpdate(bookingId, req.body, { new: true, upsert: true });
        return res.status(200).json(updateAmenityBooking);
    }
    catch (error) {
        next(error);
    }
}

//delete amenity booking - User
export const deleteAmenityBooking = async (req, res, next) => {
    try {
        const { bookingId } = req.params;
        const deleteAmenityBooking = await AmenitiesBooking.findByIdAndDelete(bookingId);
        return res.status(200).json(deleteAmenityBooking);
    }
    catch (error) {
        next(error);
    }
}

