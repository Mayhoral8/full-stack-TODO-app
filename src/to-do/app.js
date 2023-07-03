import React,{useState, useCallback} from 'react'
import Navbar from './navbar'
import Login from './login'
import Signup from './signup'
import Main from './main'
import { Route, Routes, useNavigate } from 'react-router-dom'
import LoadingOverlay from './acessory//loadingOverlay'
import Newplace from './CRUD/newTask'
import UpdatePlace from './CRUD/updateTask'
import { Contexts } from './context/context'
import Modal from './acessory/modal'


 const App = ()=> {
const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [updateItem, setUpdateItem] = useState('')
    const [isLoading, setIsloading] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [modalErrMsg, setModalErrMsg] = useState('')

    const login = useCallback(()=>{
      setIsLoggedIn(()=> true)
      return navigate('/places/u1')
    }, [])

    const logout = useCallback(()=>{
     return setIsLoggedIn(()=> false)
    }, [])

 const showLoading= useCallback(()=>{
  return setIsloading(()=> true)
 }, [])
 const hideLoading = useCallback(()=>{
  return setIsloading(()=> false)

 })
  return (
   <>
          <Contexts.Provider value={{auth:{isLoggedIn: isLoggedIn, login: login,  logout: logout}, data: {updateItem, setUpdateItem}, loading: {isLoading: isLoading, showLoading, hideLoading}, modal: {modalShow, setModalShow, modalErrMsg, setModalErrMsg}}}>
        <Navbar/>
        <Modal/>
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