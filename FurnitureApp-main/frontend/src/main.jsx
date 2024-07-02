import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'
axios.defaults.baseURL="http://localhost:8000";
axios.defaults.withCredentials=true;
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    
    <BrowserRouter>
    <Toaster position="top-right" toastOptions={{style:{fontSize:'15px'}}}/>
      <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
