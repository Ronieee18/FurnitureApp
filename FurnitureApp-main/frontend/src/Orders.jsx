import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PX0m0RsNpLRm5Td9TsoYKd9DCWxqml3wp3h2MOgSf27Ps4JBArP0ZnqWfHk14uerUHwXDc0PhqEk2KhCrrWns1H0034AWNJTg');

const Orders = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/bookings');
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Error fetching bookings. Please try again later.');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handlePayNow = async (bookingId) => {
    try {
      const response = await axios.post('/stripe/create-checkout-session', {
        bookingId,
      });
  
      const { sessionId } = response.data;
  
      if (!sessionId) {
        throw new Error('No session ID received from server');
      }
  
      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({ sessionId });
  
      if (result.error) {
        console.error('Error redirecting to checkout:', result.error.message);
        // Handle error scenario, e.g., display an error message to the user
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      // Handle error scenario, e.g., display an error message to the user
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-lg shadow-md p-4">
              <p className="text-lg font-semibold">Furniture: {booking.furniture.name}</p>
              <p>Start Date: {new Date(booking.startDate).toLocaleDateString()}</p>
              <p>End Date: {new Date(booking.endDate).toLocaleDateString()}</p>
              <p>Status: {booking.status}</p>
              {booking.status === 'Pending' && (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
                  onClick={() => handlePayNow(booking._id)}
                >
                  Pay Now
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
