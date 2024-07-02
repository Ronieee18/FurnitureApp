// RentingBenefits.js
import React from 'react';
import { LocalShipping, Build, Autorenew, Refresh, EventBusy, Cached } from '@mui/icons-material';

const benefits = [
  {
    icon: <LocalShipping style={{ fontSize: 40, color: '#126DED' }} />,
    title: 'Finest-quality products',
    description: 'Quality matters to you, and us! That\'s why we do a strict quality-check for every product.',
  },
  {
    icon: <Refresh style={{ fontSize: 40, color: '#126DED' }} />,
    title: 'Free relocation',
    description: 'Changing your house or even your city? We\'ll relocate your rented products for free.',
  },
  {
    icon: <Build style={{ fontSize: 40, color: '#126DED' }} />,
    title: 'Free maintenance',
    description: 'Keeping your rented products in a spick and span condition is on us, so you can sit back and relax.',
  },
  {
    icon: <EventBusy style={{ fontSize: 40, color: '#126DED' }} />,
    title: 'Cancel anytime',
    description: 'Pay only for the time you use the product and close your subscription without any hassle.',
  },
  {
    icon: <Autorenew style={{ fontSize: 40, color: '#126DED' }} />,
    title: 'Easy return on delivery',
    description: 'If you don\'t like the product on delivery, you can return it right away—no questions asked.',
  },
  {
    icon: <Cached style={{ fontSize: 40, color: '#126DED' }} />,
    title: 'Keep upgrading',
    description: 'Bored of the same product? Upgrade to try another, newer design and enjoy the change!',
  },
];

const RentingBenefits = () => {
  return (
    <div className="flex flex-col items-center my-12">
      <h2 className="text-2xl font-bold mb-2">There's more to renting</h2>
      <div className="w-16 h-1 bg-red-400 mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex flex-col items-center text-center p-4 border rounded-lg shadow-sm">
            <div className="mb-4">
              {benefit.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
            <p className="text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>
      <button className="mt-6 text-white font-bold text-lg py-2 px-6 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 shadow-md hover:shadow-lg transition-shadow duration-300 hover:from-blue-500 hover:to-blue-700">
        KNOW MORE
      </button>
    </div>
  );
}

export default RentingBenefits;
