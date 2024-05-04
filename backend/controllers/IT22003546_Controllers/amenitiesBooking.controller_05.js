import AmenitiesBooking from "../../models/IT22003546_Models/amenitiesBooking.model_05.js";

// //Book amenity
// export const bookAmenity = async (req, res, next) => {
//     try {
//         const newAmenitiesBooking = await AmenitiesBooking.create(req.body);
//         return res.status(201).json({
//             success: true,
//             message: "Amenity booked successfully",
//             amenitiesBooking: newAmenitiesBooking
//         });
//     } catch (error) {
//         next(error);
//     }
// }

export const bookAmenity = async (req, res, next) => {
    try {
        console.log("Request Body:", req.body);  // Log request data

        // Ensure consistent formatting for bookingTime
        let bookingTime = req.body.bookingTime;

        // Check if the length of the time string is less than 5 (HH:MM)
        if (bookingTime.length < 5) {
            // If the time is a single digit hour (e.g., "7:30"), we remove the leading zero
            if (bookingTime[0] === '0') {
                bookingTime = bookingTime.substring(1); // Remove the leading zero
            }
        }


        const isBookingExist = await AmenitiesBooking.findOne({
            //bookingID: req.body.bookingID,
            bookingDate: req.body.bookingDate,
            bookingTime: bookingTime,
            bookingStatus: 'Confirmed',
        });

        console.log("Existing Booking:", isBookingExist);  // Log found booking
        console.log("Booking Time:", bookingTime);  // Log formatted booking time

        if (isBookingExist) {
            // If booking already exists and is confirmed, reject new booking
            return res.status(409).json({
                success: false,
                message: "A booking for this time slot is already confirmed and cannot be double-booked.",
            });
        } else {
            // If no confirmed booking exists, create a new confirmed booking
            const newAmenitiesBooking = await AmenitiesBooking.create({
                ...req.body,
                bookingStatus: "Pending",
            });

            // Send a success response with the newly created booking
            return res.status(201).json({
                success: true,
                message: "Amenity booking created successfully",
                amenityBooking: newAmenitiesBooking,
            });
        }
    } catch (error) {
        console.error("Error in booking amenity:", error);  // Log any errors
        next(error);
    }
};





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

// export const updateAmenityBooking = async (req, res, next) => {
//     try {
//         console.log("Request Body:", req.body);  // Log request data

//         // Ensure consistent formatting for bookingTime
//         let bookingTime = req.body.bookingTime;

//         // Check if the length of the time string is less than 5 (HH:MM)
//         if (bookingTime.length < 5) {
//             // If the time is a single digit hour (e.g., "7:30"), we remove the leading zero
//             if (bookingTime[0] === '0') {
//                 bookingTime = bookingTime.substring(1); // Remove the leading zero
//             }
//         }


//         const isBookingExist = await AmenitiesBooking.findOne({
//             //bookingID: req.body.bookingID,
//             bookingDate: req.body.bookingDate,
//             bookingTime: bookingTime,
//             bookingStatus: 'Confirmed',
//         });

//         console.log("Existing Booking:", isBookingExist);  // Log found booking
//         console.log("Booking Time:", bookingTime);  // Log formatted booking time

//         if (isBookingExist) {
//             // If booking already exists and is confirmed, reject new booking
//             return res.status(409).json({
//                 success: false,
//                 message: "A booking for this time slot is already confirmed and cannot be double-booked.",
//             });
//         } else {
//             // If no confirmed booking exists, create a new confirmed booking
//             const newAmenitiesBooking = await AmenitiesBooking.findByIdAndUpdate({
//                 ...req.body,
//                 bookingStatus: "Pending",
//             });

//             // Send a success response with the newly created booking
//             return res.status(201).json({
//                 success: true,
//                 message: "Amenity booking created successfully",
//                 amenityBooking: newAmenitiesBooking,
//             });
//         }
//     } catch (error) {
//         console.error("Error in booking amenity:", error);  // Log any errors
//         next(error);
//     }
// };



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

//get all bookings
export const getAllBookings = async (req, res, next) => {
    try {
        const allBookings = await AmenitiesBooking.find();
        return res.status(200).json(allBookings);
    }
    catch (error) {
        next(error);
    }
}

