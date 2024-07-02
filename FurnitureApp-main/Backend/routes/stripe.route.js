import express from 'express';
import Stripe from 'stripe';
import Booking from '../models/booking.model.js';
import { verifyToken } from '../utils/tokenManager.js';
import Furniture from '../models/furniture.model.js';
import User from '../models/user.model.js';
import dotenv from 'dotenv'
dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// router.use('/webhook', express.raw({ type: 'application/json' }));

// Route to create a checkout session
router.post('/create-checkout-session', verifyToken, async (req, res) => {
    const { bookingId } = req.body;

    try {
        const booking = await Booking.findById(bookingId).populate('furniture');

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: booking.furniture.name,
                            description: booking.furniture.description,
                        },
                        unit_amount: booking.amount * 100, // Amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`, // URL to redirect after successful payment
            cancel_url: `${process.env.CLIENT_URL}/cancel`, // URL to redirect after canceled payment
            metadata: {
                bookingId: booking._id.toString(), // Include bookingId in metadata
            },  
        });

        res.status(200).json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ message: 'Failed to create checkout session', error });
    }
});

// Webhook endpoint to handle Stripe events
router.post('/webhook',  async (req, res) => {
    console.log("Inside webhook");
    const payload = req.body; // This should now be a Buffer or string

    const sig = req.headers['stripe-signature'];
    
    let event;

    try {
        // Convert the payload to a string if it's a Buffer
        console.log('Received payload:', req.body.toString('utf8'));
        console.log('Received signature:', sig);
        const payloadString = (typeof payload === 'object') ? payload.toString('utf8') : payload;

        event = stripe.webhooks.constructEvent(payloadString, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            console.log(session);
            const bookingId = session.metadata.bookingId;

            try {
                // Update booking status in the database
                await Booking.findByIdAndUpdate(bookingId, { status: 'Payment Done' });
                console.log(`Booking ${bookingId} status updated to Payment Done`);
            } catch (err) {
                console.error('Error updating booking status:', err);
                return res.status(500).json({ error: 'Error updating booking status' });
            }
            break;
        case 'payment_intent.payment_failed':
            const paymentFailure = event.data.object;
            // Handle payment failure, notify user, etc.
            break;
        // Add more cases as needed for different types of events
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({ received: true });
});

export default router;
