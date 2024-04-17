import express from 'express';
import { bookAmenity, updateAmenityBooking, deleteAmenityBooking, getAmenityBookingById, getAllBookings} from '../../controllers/IT22003546_Controllers/amenitiesBooking.controller_05.js';
import { verifyToken } from '../../utils/verifyUser.js';

const router = express.Router();

// Error handling
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

// create a new amenity booking
router.post('/create', verifyToken, bookAmenity);

// get amenity bookings by ID
router.get('/get/:bookingId', verifyToken, getAmenityBookingById);

//update amenity booking
router.put('/update/:bookingId', verifyToken, updateAmenityBooking);

//delete amenity booking
router.delete('/delete/:bookingId', verifyToken, deleteAmenityBooking);

//get all bookings
router.get('/getAll', verifyToken, getAllBookings);

export default router;