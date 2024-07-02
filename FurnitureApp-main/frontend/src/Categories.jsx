import React from 'react';
import { useNavigate } from 'react-router-dom';

// Importing images
import sofa from '/sofa.png';
import bed from '/bed.png';
import appliancesIcon from '/other.png';
import dining from '/dining.png';
import fitnessIcon from '/outdoor.png';

const categories = [
  { name: 'Living Room', icon: sofa, link: '#' },
  { name: 'Bedroom', icon: bed, link: '#' },
  { name: 'Dining', icon: dining, link: '#' },
  { name: 'Outdoor', icon: fitnessIcon, link: '#' },
  { name: 'Other', icon: appliancesIcon, link: '#' },
];

export default function RentCategories() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`/furnitures?category=${categoryName}`);
  };

  return (
    <div className="text-center py-8">
      <h2 className="text-2xl font-semibold mb-6 relative inline-block">
        Rent Furniture & Appliances
        <div className="h-1 w-16 bg-red-500 mx-auto mb-4 mt-3" />
      </h2>
      <div className="flex justify-center gap-6">
        {categories.map((category) => (
          <div
            key={category.name}
            onClick={() => handleCategoryClick(category.name)}
            className="group relative p-4 border rounded-lg w-40 shadow-sm transition-all duration-200 hover:bg-gray-100 cursor-pointer"
          >
            <div className="flex flex-col items-center">
              <img
                src={category.icon}
                alt={category.name}
                className="mx-auto mb-4 h-20 w-20 object-contain"
              />
              <h3 className="text-lg font-medium">{category.name}</h3>
            </div>
            <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
