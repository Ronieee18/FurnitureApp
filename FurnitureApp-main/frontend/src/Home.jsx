import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser, setUser } from './store/authSlice';
import { useNavigate } from 'react-router-dom';
import HeroSection from "./HeroSection"
import Categories from "./Categories"
import FurnitureCard from "./FurnitureCard"
import KnowMore from "./KnowMore"
import Footer from "./Footer"


function Home() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("/getUser");
        if (res.data.user) {
          dispatch(setUser(res.data.user));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error fetching user data
      }
    };

    getUser();
  }, [dispatch]);

  

  return (
    <div>
      <HeroSection/>
      <Categories/>
      <FurnitureCard/>
      <KnowMore/>
      <Footer/>
      <button
        className="fixed bottom-5 right-5 text-xl animate-pulse bg-red-700 text-white py-2 px-4 rounded-2xl hover:bg-red-600 z-50"
        onClick={()=>navigate('/rent-furniture')}
        
      >
        Rent Your Furniture
      </button>
    </div>
  );
}

export default Home;
