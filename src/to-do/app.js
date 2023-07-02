import React,{useState, useCallback} from 'react'
import Navbar from './navbar'
import Login from './login'
import Signup from './signup'
import Main from './main'
import { Route, Routes, useParams, useNavigate } from 'react-router-dom'
import LoadingOverlay from './loadingOverlay'
import Newplace from './CRUD/newPlaces'
import UpdatePlace from './CRUD/updatePlace'
import { Contexts } from './context/context'
import {data} from './data'


 const App = ()=> {
const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [updateItem, setUpdateItem] = useState('')
    const login = useCallback(()=>{
      setIsLoggedIn(()=> true)
      return navigate('/places/u1')
    }, [])

    const logout = useCallback(()=>{
     return setIsLoggedIn(()=> false)
    }, [])

 
  return (
   <>
          <Contexts.Provider value={{auth:{isLoggedIn: isLoggedIn, login: login,  logout: logout}, data: {updateItem, setUpdateItem}}}>
        <Navbar/>
        <LoadingOverlay/>
        <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path = '/places/:id' element = {<Main/>}/>
        <Route path = '/newPlace' element = {<Newplace/>}/>
        <Route path = '/updatePlace/:id' element = {<UpdatePlace/>}/>
        </Routes>
          </Contexts.Provider>
    
   </>
  )
}
export default App