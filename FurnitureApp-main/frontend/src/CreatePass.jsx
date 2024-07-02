import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function CreatePass() {
  const navigate = useNavigate();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const savePass = async () => {
    try {
        toast.loading('Saving Password..', { id: 'pass' });
        if (!password || !confirmPassword) {
          toast.error('*Both fields are required', { id: 'pass' });
          return;
        }
        if (password !== confirmPassword) {
          toast.error('*Passwords do not match', { id: 'pass' });
          return;
        }
    
        const res = await axios.post('/user/savePass', { password });
        toast.success('Password saved successfully!', { id: 'pass' });
        navigate('/');
    } catch (error) {
        toast.error(`Error:${error}`,{id:'pass'})
        console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-xl mb-5">Create CozyRent Password</h1>
        <input
          type="password"
          value={password}
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          onClick={savePass}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default CreatePass;
