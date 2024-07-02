import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BookingForm from './BookingForm';

function SelectedFurniture() {
  const { id } = useParams();
  const [furniture, setFurniture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchFurnitureDetails = async () => {
      try {
        const response = await axios.get(`/furniture/${id}`);
        setFurniture(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching furniture details:', error);
        setLoading(false);
      }
    };

    fetchFurnitureDetails();
  }, [id]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % furniture.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + furniture.images.length) % furniture.images.length);
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (!furniture) {
    return <div className="container mx-auto p-4">Furniture not found</div>;
  }

  return (
    <div className="container mx-auto p-4 mt-10">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="relative">
          <img
            src={furniture.images[currentImageIndex]}
            alt={furniture.name}
            className="w-full h-96 object-cover"
          />
          {furniture.images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              >
                &lt;
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              >
                &gt;
              </button>
            </>
          )}
        </div>
        <div className="p-6">
          <h2 className="text-4xl font-bold mb-4">{furniture.name}</h2>
          <p className="text-gray-600 mb-4">{furniture.description}</p>
          <p className="text-gray-600 mb-2"><strong>Category:</strong> {furniture.category}</p>
          <p className="text-gray-600 mb-6"><strong>Price:</strong> ₹{furniture.price}/mo</p>
          
        </div>
      </div>
      <div id="booking-form" className="mt-10">
        <BookingForm furnitureId={id} price={furniture.price} />
      </div>
    </div>
  );
}

export default SelectedFurniture;
