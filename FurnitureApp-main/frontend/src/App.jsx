import { useEffect, useState } from 'react'
import axios from 'axios';
import { Route,Routes } from 'react-router-dom';
import LoginPage from './Login';
import Home from './Home';
import { useSelector } from 'react-redux';
import PageNotFound from './PageNotFound';
import Furnitures from './Furnitures';
import ResponsiveAppBar from './Header';
import ContactUs from './ContactUs';
import NewLogin from './NewLogin';
import LoginPopup from './LoginPopup';
import CreatePass from './CreatePass';
import NavbarWithMegaMenu from './Header1';
import SelectedFurniture from './SelectedFurniture';
import Orders from './Orders';
import Profile from './Profile';

import NewHeader from "./NewHeader"
import RentFurniture from './RentFurniture';
import Success from './Success';

function App() {
  const isAuthenticatedStore = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticatedStore);
  return (
    <>
    {/* <ResponsiveAppBar/> */}
    <NewHeader/>
    {/* <NavbarWithMegaMenu/> */}
    <Routes>
    
      <Route  path='/login' element={<LoginPopup/>}/>
      <Route  path='/createPass' element={<CreatePass/>}/>
      <Route  path='/orders' element={<Orders/>}/>
      <Route  path='/profile' element={<Profile/>}/>
      <Route  path='/success' element={<Success/>}/>
      
      <Route  path='/' element={<Home/>}/>
      <Route  path='/rent-furniture' element={<RentFurniture/>}/>
      <Route  path='/contactus' element={<ContactUs/>}/>

      <Route  path='/' element={<Home/>}/>
      {isAuthenticatedStore ?
      <Route  path='/furnitures' element={<Furnitures/>}/>:
      <Route  path='/furnitures' element={<LoginPopup/>}/>
    }
    <Route  path='/furnitures/:id' element={<SelectedFurniture/>}/>:
    <Route  path='*' element={<PageNotFound/>}/>

    </Routes>
    </>
  )
}

export default App
