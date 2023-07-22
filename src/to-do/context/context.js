import React, {useState, useCallback, useEffect} from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";


export const Contexts = createContext()
const ContextProvider = (props)=>{
    const navigate = useNavigate()

    const [token, setToken] = useState(false)
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
    const [tokenExpDate, setTokenExpDate]= useState ()
    const [logoutModal, setLogoutModal] = useState(false)
    const [modalMsg, setModalMsg] = useState('')
    const [show, setShow] = useState(false)


   
     
  
  
  
      const login =  useCallback((id, name, image, token, tokenDuration)=>{
        setToken(token)
        setUserId(id)
        setDspName(name)
        setProfileImg(image)
        const tokenExpirationDate = tokenDuration || new Date().getTime() + (1000 * 60 * 60)
        setTokenExpDate(tokenExpirationDate)
        localStorage.setItem('userData', JSON.stringify({userId: id, token: token, image:image, name:name, tokenExpirationDate}))
        return navigate(`/${id}/tasks`)  
      }, [])
  
    const logout = useCallback(()=>{
        setToken(()=> null)
        setTokenExpDate(null)
        setModalShow(false)
        console.log('yayy')
        localStorage.removeItem('userData')
        return navigate('/login')
        
      }, [])
      
      let timeoutId;
      useEffect(()=>{
       
        if(tokenExpDate){
          const minutesLeft = tokenExpDate - new Date().getTime()
          console.log(minutesLeft)
          timeoutId = setTimeout(logout, minutesLeft)
        }else{
            clearTimeout(timeoutId)
        }
      }, [tokenExpDate, logout])

      useEffect(()=>{
        
        const storedData = JSON.parse(localStorage.getItem('userData'))
        if(storedData && storedData.token && storedData.tokenExpirationDate > new Date().getTime()){
          login(storedData.userId, storedData.name, storedData.image, storedData.token, storedData.tokenExpirationDate)
        }else{
          
        }
      }, [token])
  
   const showLoading= useCallback(()=>{
    return setIsloading(()=> true)
   }, [])
   const hideLoading = useCallback(()=>{
    return setIsloading(()=> false)
  
   })
  
    return(<>

    <Contexts.Provider value={
        {auth:{token, login,  logout}, data: {updateItem, setUpdateItem}, loading: {isLoading: isLoading, showLoading, hideLoading}, modal: {modalMsg, setModalMsg, logoutModal, setLogoutModal, modalShow, setModalShow, modalErrMsg, setModalErrMsg, delModal, setDelModal}, responseData: {loadedData, setLoadedData, userId, setUserId, dspName, setDspName, taskId, setTaskId}, files:{file, setFile, isFileValid, setIsFileValid, profileImg, setProfileImg}, logoutContext:{show, setShow}
    }
 }>
              {props.children}
    </Contexts.Provider>
    </>)

}
export {ContextProvider}