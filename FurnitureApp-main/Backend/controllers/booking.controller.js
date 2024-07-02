import { asyncHandler } from "../utils/asyncHandler.js";
import Furniture from "../models/furniture.model.js";
import Booking from "../models/booking.model.js";

export const getBookings=asyncHandler( async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user furniture');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

export const getBookingById=asyncHandler(async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('user furniture');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
export const addBooking=asyncHandler(async (req, res) => {
    const { furnitureId, startDate, endDate } = req.body;
    try {
        const furniture = await Furniture.findById(furnitureId);
        if (!furniture) {
            return res.status(404).json({ message: 'Furniture not found' });
        }
        const booking = new Booking({
            user: req.user._id,
            furniture: furniture._id,
            startDate,
            endDate,
            amount: furniture.price
        });
        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
})
export const getAllUserBookings=asyncHandler(async (req, res) => {
    const userId = req.user._id; // Get the user ID from the authenticated user
    const bookings = await Booking.find({ user: userId }).populate('furniture'); // Assuming 'user' field in Booking model references user ID

    res.json(bookings);
})
