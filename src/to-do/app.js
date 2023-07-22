import React,{useState, useCallback, useEffect, Suspense} from 'react'
import Navbar from './navbar'
// import Login from './login'
// import Signup from './signup'
// import Main from './main'
import Home from './home'
import { Route, Routes, useNavigate } from 'react-router-dom'
import LoadingOverlay from './acessory//loadingOverlay'
// import Newplace from './CRUD/newTask'
// import UpdatePlace from './CRUD/updateTask'
import { Contexts } from './context/context'
import Modal from './acessory/modal'


const Newplace = React.lazy(()=> import('./CRUD/newTask'))
const UpdatePlace = React.lazy(()=> import('./CRUD/updateTask'))
const Login = React.lazy(()=> import('./authentication/login'))
const Signup = React.lazy(()=> import('./authentication/signup'))
const Main = React.lazy(()=> import('./main'))



 const App = ()=> {

   
  return (
   <>
        
        <Navbar/>
        <Modal/>
        <Suspense fallback={<div><LoadingOverlay></LoadingOverlay></div>}>
        <LoadingOverlay/>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path = '/:userId/tasks' element = {<Main/>}/>
        <Route path = '/newPlace' element = {<Newplace/>}/>
        <Route path = '/updatePlace/:id' element = {<UpdatePlace/>}/>
        </Routes>
        </Suspense>
          
    
   </>
  )
}
export default App