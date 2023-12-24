import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from './to-do/context/context.tsx';

// import App from './App'
import App from './to-do/app';


const root = ReactDOM.createRoot(document.getElementById('root'));
// const loginState = useSelector((state)=> state.login)
root.render(

    <BrowserRouter>
    <ContextProvider>
        <App/>      
    </ContextProvider>
    </BrowserRouter>

);

