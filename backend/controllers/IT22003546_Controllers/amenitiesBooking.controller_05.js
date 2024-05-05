import AmenitiesBooking from "../../models/IT22003546_Models/amenitiesBooking.model_05.js";
import amenitiesBookingEmailTemplate from "../../utils/email_templates/amenityBookingEmailTemplate.js";
import sendEmail from "../../utils/sendEmail_Tommy.js";
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

        // Check fair allocation rules here

        const pastBookings = await AmenitiesBooking.find({
            residentUsername: req.body.residentUsername,
            amenityTitle: req.body.amenityTitle,
            bookingStatus: { $in: ['Confirmed', 'Pending'] },
            bookingDate: { $lt: req.body.bookingDate },
        }).sort({ bookingDate: -1 }).limit(2);
        
        if (pastBookings.length === 2) {
            const lastBookingDate = new Date(pastBookings[0].bookingDate);
            const secondLastBookingDate = new Date(pastBookings[1].bookingDate);
            const newBookingDate = new Date(req.body.bookingDate);
        
            // Calculate the difference in days between the last two bookings
            const dayDifference = Math.abs((lastBookingDate - secondLastBookingDate) / (1000 * 60 * 60 * 24));
        
            // Check if the new booking date is consecutive with the last two bookings
            if (dayDifference !== 1 || (newBookingDate - lastBookingDate) / (1000 * 60 * 60 * 24) !== 1) {
                // Allow the user to book if the new booking date is not consecutive with the last two bookings
                // Proceed with the booking process
            } else {
                // Deny the booking since the new booking date is consecutive with the last two bookings
                return res.status(409).json({
                    success: false,
                    message: "You cannot book the same amenity for more than 2 consecutive days.",
                });
            }
        }

        // Split the bookingTime string into an array of start and end times
        const [bookingTimeStart, bookingTimeEnd] = bookingTime.split(" to ");

        // Convert start and end times to integers
        const startTime = parseInt(bookingTimeStart.split(":")[0]);
        const endTime = parseInt(bookingTimeEnd.split(":")[0]);

        // Generate an array of time strings between start and end times
        const bookingHours = [];
        for (let i = startTime; i < endTime; i++) {
            // Convert the integer to a time string (e.g., 6 => "6:00")
            const hour = i < 10 ? `0${i}` : `${i}`; // Add leading zero if needed
            const timeString = `${hour}:00`;
            
            // Push the time string to the array
            bookingHours.push(timeString);
        }
        console.log("Booking Hours:", bookingHours); // Log generated hours

        // If fair allocation rules pass, proceed with booking

        const isBookingExist = await AmenitiesBooking.findOne({
            //bookingID: req.body.bookingID,
            bookingDate: req.body.bookingDate,
            $and: [
                // { bookingTime: { $in: bookingHours } },
                {startTime:{$gte:req.body.startTime}} ,
                {endTime:{$gte:req.body.endTime}} ,// Check if any bookingTime falls within the bookingHours
                { bookingStatus: { $in: ['Confirmed', 'Pending'] } } // Ensure bookingStatus is 'Confirmed' or 'Pending'
            ]
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

            const emailTemplate = amenitiesBookingEmailTemplate(req.body.residentName,{
                ...req.body,
                bookingStatus: "Pending",
            });
            sendEmail(
                req.body.residentEmail,
                "Amenity Booking Confirmation",
                emailTemplate
            );


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

        if (
            req.body.bookingStatus === "Confirmed"
        ) {
            // Send an email notification to the resident
            const emailTemplate = amenitiesBookingEmailTemplate(req.body.residentName,{
                ...req.body,
                bookingStatus: "Confirmed",
            });
            sendEmail(
                req.body.residentEmail,
                "Amenity Booking Confirmation",
                emailTemplate
            );
        }
        
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


