import React,{useState, useCallback} from 'react'
import Navbar from './navbar'
import Login from './login'
import Signup from './signup'
import Main from './main'
import { Route, Routes } from 'react-router-dom'
import LoadingOverlay from './loadingOverlay'
import Newplace from './CRUD/newPlaces'
import UpdatePlace from './CRUD/updatePlace'
import { Contexts } from './context/context'


 const App = ()=> {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const login = useCallback(()=>{
     setIsLoggedIn(true)
    }, [])

    const logout = useCallback(()=>{
     setIsLoggedIn(false)
    }, [])
  return (
   <>
          <Contexts.Provider value={{isLoggedIn: isLoggedIn, login: login,  logout: logout}}>
        <Navbar/>
        <LoadingOverlay/>
        <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path = '/places/:id' element = {<Main/>}/>
        <Route path = '/newPlace/:id' element = {<Newplace/>}/>
        <Route path = '/updatePlace/:id' element = {<UpdatePlace/>}/>
        </Routes>
          </Contexts.Provider>
    
   </>
  )
}
export default App