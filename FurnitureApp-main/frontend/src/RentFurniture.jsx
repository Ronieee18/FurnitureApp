import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const RentFurniture = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [agree, setAgree] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAgreeChange = (event) => {
    setAgree(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (phoneNumber.length === 10) {
      setOtpSent(true);
    } else {
      alert('Phone number must be 10 digits long.');
    }
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const closeModal = () => {
    setOtpSent(false);
    setOtp('');
  };

  return (
    <>
      <div className={`flex gap-32 min-h-screen p-10 text-4xl bg-[#03045e] ${otpSent && 'filter blur-sm'}`}>
        <div className='flex-col'>
          <h1 className='text-white'>Post Property for Rent Online for FREE</h1>
          <div className='flex gap-5'>
            <div className='h-[220px] rounded-lg w-[220px] mt-10 bg-[#b4d1ff] flex flex-col justify-center items-center'>
              <img src="/sold.svg" alt="" />
              <p className='text-[#333333] text-center'>Property sold <br /> Every <br /> <span className='text-black'>30</span> <br /> Minutes</p>
            </div>
            <div className='h-[220px] rounded-lg w-[230px] mt-10 bg-[#b4d1ff] flex flex-col justify-center items-center'>
              <img src="/rented.svg" alt="" />
              <p className='text-[#333333] text-center'>Property Rent <br /> Every <br /> <span className='text-black'>20</span> <br /> Minutes</p>
            </div>
          </div>
        </div>
        <div className="bg-white text-black p-6 rounded-lg w-80 h-fit py-10">
          <h2 className="text-2xl font-bold mb-4">Let's get you started</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-lg">
                Your contact number:
                <input
                  type="tel"
                  placeholder="+91 Phone Number"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  className="mt-1 block w-full p-2 border border-gray-800 rounded"
                  maxLength={10}
                />
              </label>
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={handleAgreeChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-lg">Agree to terms & conditions</span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white disabled:bg-gray-600 disabled:cursor-not-allowed text-lg py-2 rounded hover:bg-blue-700"
              disabled={!agree}
            >
              Continue
            </button>
          </form>
        </div>
      </div>

      {otpSent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-2xl font-bold mb-4">OTP Sent</h2>
            <p className="mb-4">OTP sent to {phoneNumber}</p>
            <label className="block text-lg">
              Enter OTP:
              <input
                type="text"
                value={otp}
                onChange={handleOtpChange}
                className="mt-1 block w-full p-2 border border-gray-800 rounded"
              />
            </label>
            <button
              onClick={closeModal}
              className="mt-4 w-full bg-blue-600 text-white text-lg py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RentFurniture;
