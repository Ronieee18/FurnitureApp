import { Router } from "express";
import { addBooking, getAllUserBookings } from "../controllers/booking.controller.js";
import { verifyToken } from "../utils/tokenManager.js";

const bookingRoutes=Router();
bookingRoutes.post('/book',verifyToken,addBooking)
bookingRoutes.get('/',verifyToken,getAllUserBookings)
export {bookingRoutes};