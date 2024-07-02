import React, { useState } from 'react';
import axios from 'axios';

function BookingForm({ furnitureId, price }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  const handleBooking = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Call your backend to create a booking
      const response = await axios.post('/bookings/book', {
        furnitureId,
        startDate,
        endDate,
        price,
      });
      const booking = response.data;

      // Redirect or show confirmation to user
      console.log('Booking created:', booking);
      setLoading(false);
      // Optionally, you can show a confirmation message to the user here
    } catch (error) {
      console.error('Error creating booking:', error);
      setLoading(false);
    }
  };

  return (
    <form className="bg-white shadow-md rounded-lg p-6" onSubmit={handleBooking}>
      <h3 className="text-2xl font-bold mb-4">Book This Furniture</h3>
      <div className="mb-4">
        <label className="block text-gray-700">Start Date</label>
        <input
          type="date"
          className="w-full p-2 border border-gray-300 rounded mt-1"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          min={today}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">End Date</label>
        <input
          type="date"
          className="w-full p-2 border border-gray-300 rounded mt-1"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          min={startDate || today} // Ensure end date is not before start date
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-600 transition-colors duration-300"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Add to Cart'}
      </button>
    </form>
  );
}

export default BookingForm;
