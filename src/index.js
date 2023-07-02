import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

// import App from './App'
import App from './to-do/app';


const root = ReactDOM.createRoot(document.getElementById('root'));
// const loginState = useSelector((state)=> state.login)
root.render(
  <React.StrictMode>
    <BrowserRouter>
<App/>      
    </BrowserRouter>
  </React.StrictMode>
);

