import React,{ Suspense} from 'react'
import Navbar from './navbar.tsx'

import Home from './home.tsx'
import { Route, Routes } from 'react-router-dom'
import LoadingOverlay from './acessory//loadingOverlay'
import Modal from './acessory/modal'
import Toast from './acessory/toast'
import { Toaster, toast } from 'sonner';



const Newplace = React.lazy(()=> import('./CRUD/newTask'))
const UpdatePlace = React.lazy(()=> import('./CRUD/updateTask'))
const Login = React.lazy(()=> import('./authentication/login.tsx'))
const Signup = React.lazy(()=> import('./authentication/signup.tsx'))
const Main = React.lazy(()=> import('./main.tsx'))



 const App = ()=> {

   
  return (
   <>
        
        <Navbar/>
        <Toast/>
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