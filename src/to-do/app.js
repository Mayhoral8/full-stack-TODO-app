import React,{useState, useCallback} from 'react'
import Navbar from './navbar'
import Login from './login'
import Signup from './signup'
import Main from './main'
import Home from './home'
import { Route, Routes, useNavigate } from 'react-router-dom'
import LoadingOverlay from './acessory//loadingOverlay'
import Newplace from './CRUD/newTask'
import UpdatePlace from './CRUD/updateTask'
import { Contexts } from './context/context'
import Modal from './acessory/modal'
import ImageUpload from './image-upload'


 const App = ()=> {
const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [updateItem, setUpdateItem] = useState('')
    const [isLoading, setIsloading] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [modalErrMsg, setModalErrMsg] = useState('')
    const [loadedData, setLoadedData] = useState([])
    const [userId, setUserId] = useState('')
    const [taskId, setTaskId] = useState('')
    const [dspName, setDspName] = useState('')
    const [delModal, setDelModal] = useState(false)
    const [file, setFile] = useState('')
    const [isFileValid, setIsFileValid] = useState(false)
    const [profileImg, setProfileImg] = useState('')
    
    const deleteHandler = async (e)=>{
      e.preventDefault()
      console.log('clicked')
      setModalShow(false) 
      showLoading()
      try{
        console.log(taskId)
         const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`,{
             method: 'DELETE'
         })
         const responseData = await response.json()
         if(!response.ok){
             throw new Error(responseData.message)
         }
         hideLoading() 
         setDelModal(false)
         return navigate(`/${userId}/tasks`)  
     }catch(err){
         hideLoading()
         setDelModal(false)
         setModalShow(true)
         setModalErrMsg(err.message)
         console.log(err)
     }
    }
   



    const login =  useCallback((user)=>{
      setIsLoggedIn(()=> true)
       setDspName(user.name)
       setProfileImg(user.image)
    return navigate(`/${user.id}/tasks`)  

    }, [])
     
    // const login = ()=>{
    //   setIsLoggedIn(true)
    // }

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
          <Contexts.Provider value={{auth:{isLoggedIn: isLoggedIn, login: login,  logout: logout}, data: {updateItem, setUpdateItem}, loading: {isLoading: isLoading, showLoading, hideLoading}, modal: {modalShow, setModalShow, modalErrMsg, setModalErrMsg, delModal, setDelModal}, responseData: {loadedData, setLoadedData, userId, setUserId, dspName, setDspName, taskId, setTaskId, deleteHandler}, files:{file, setFile, isFileValid, setIsFileValid, profileImg, setProfileImg}}}>
        <Navbar/>
        <Modal/>
        <LoadingOverlay/>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path = '/:userId/tasks' element = {<Main/>}/>
        <Route path = '/newPlace' element = {<Newplace/>}/>
        <Route path = '/imageupload' element = {<ImageUpload/>}/>
        <Route path = '/updatePlace/:id' element = {<UpdatePlace/>}/>
        </Routes>
          </Contexts.Provider>
    
   </>
  )
}
export default App