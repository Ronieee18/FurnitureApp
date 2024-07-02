import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import TextField from '@mui/material/TextField';
import {toast} from 'react-hot-toast'
function LoginPopup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleGoogleLogin = async () => {
        try {
            const response = await axios.get('http://localhost:8000/auth/google/start', { withCredentials: true });
            window.location.href = response.data.url;
        } catch (error) {
            console.error('Error starting OAuth flow:', error);
        }
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if(!email.trim() || !password.trim()){
                alert('Please fill all the fields');
                return;
            }
            toast.loading('Logging In',{id:"login"})
            const res = await axios.post('/auth/login', { email, password }, { withCredentials: true });
            console.log(res.data);
            toast.success('Login Successful',{id:"login"})
          // Handle successful login, e.g., redirect to the homepage
            navigate('/');
        } catch (error) {
            console.error('Login error', error);
            if(error.response.data.message==='User not found'){
                toast.error('User Not Found!',{id:"login"})
            }
            else if(error.response.data.message==='Invalid credentials'){
                toast.error('Invalid credentials!',{id:"login"})
            }
            else{
                toast.error('Login Failed',{id:"login"})
            }
          // Handle login error, e.g., show an error message
        }
        };
        
    return (
    <div className='w-full flex justify-center'>
    <div className='flex shadow-xl shadow-black border border-black w-fit flex-col my-5 gap-4 justify-center  items-center p-8'>
      <div className='flex justify-center items-center'>
      <p className='font-mono  ml-1 mr-4 text-2xl tracking-widest font-semibold'>CozyRent</p>
      </div>
      
      <h1 className='text-xl font-serif '>Login</h1>
      <form onSubmit={handleLogin} className='flex flex-col gap-4'>
      <TextField
          required
          id="standard-required"
          label="Email"
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      
      <TextField
          id="standard-password-input"
          label="CozyRent Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
      <button type='submit' className='bg-[#061C69] ml-5 p-2 text-xl text-white rounded-md w-36'>Login</button> 
      </form>
      <hr className="w-full  h-0.5 bg-gray-500 border-0 mt-4 " />
      <p className='text-sm text-red-500 w-[250px]'>Note:If you don't have account create one by clicking below button </p>
      <div className='flex justify-center items-center gap-1   border border-black p-1.5 rounded-lg'>
        <FcGoogle className='h-7 w-7' />
        <button onClick={handleGoogleLogin} className='text-lg  '>SignUp with Google</button>
      </div>
    </div>
    
    </div>
  )
}

export default LoginPopup