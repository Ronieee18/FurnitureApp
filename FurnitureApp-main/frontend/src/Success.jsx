import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Success = () => {
    const location = useLocation();
    const sessionId = new URLSearchParams(location.search).get('session_id');

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center bg-white p-8 rounded-lg shadow-lg">
                <div className="mb-6">
                    <img src="./success-icon1.png" alt="Success Icon" className="w-44 h-32 mx-auto" />
                </div>
                <h1 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h1>
                <p className="text-gray-700 mb-2">Payment done Successfully</p>
                {sessionId && <p className="text-gray-700 mb-4">Your session ID: {sessionId}</p>}
                <p className="text-gray-500 mb-6">You will be redirected to the home page shortly or click here to return to home page</p>
                <Link to="/" className="inline-block px-6 py-2 text-white bg-green-600 rounded hover:bg-green-500">Home</Link>
            </div>
        </div>
    );
};

export default Success;
