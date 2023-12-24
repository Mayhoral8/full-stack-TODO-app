import React, {useState, useCallback, useEffect} from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";


type UpdateItem = {
  title: string
  description: string
  category: string,
  time?: string
  creator: string
}

export type LoadedData = {
  id: string,
  title: string,
  description: string
  creator: string
  category: string
}
 interface ContextTypes {
  auth: {
    token: string,
     login: Function,  
     logout: Function
  };
  data: {
    updateItem: UpdateItem
    setUpdateItem: React.Dispatch<React.SetStateAction<UpdateItem>>
  };
  modal: {
    modalMsg: string
    setModalMsg: React.Dispatch<React.SetStateAction<string>>
    logoutModal: boolean
    setLogoutModal: React.Dispatch<React.SetStateAction<boolean>>
    modalShow: boolean
    setModalShow: React.Dispatch<React.SetStateAction<boolean>>
    modalErrMsg: string
    setModalErrMsg: React.Dispatch<React.SetStateAction<string>>
    delModal: boolean
    setDelModal: React.Dispatch<React.SetStateAction<boolean>>
  };
  loading: {
    isLoading: boolean
    showLoading: Function
    hideLoading: Function
  };
  responseData: {
    loadedData:  LoadedData[]
    setLoadedData: React.Dispatch<React.SetStateAction<LoadedData[]>>
    userId: string
    setUserId: React.Dispatch<React.SetStateAction<string>>
    dspName: string
    setDspName: React.Dispatch<React.SetStateAction<string>>
    taskId: string
    setTaskId: React.Dispatch<React.SetStateAction<string>>
  };
  logoutContext: {
    show: boolean
    setShow: React.Dispatch<React.SetStateAction<boolean>>
  };
  files: {
    file: string
    setFile: React.Dispatch<React.SetStateAction<string>>
    isFileValid:  boolean
    setIsFileValid: React.Dispatch<React.SetStateAction<boolean>>
    profileImg: string
    setProfileImg: React.Dispatch<React.SetStateAction<string>>
  };
  task: {
    taskActionType: string
    setTaskActionType: React.Dispatch<React.SetStateAction<string>>
  }
 }
export const Contexts = createContext({} as ContextTypes)

type ContextProps = {
  children: any
}
const ContextProvider = (props:ContextProps)=>{
    const navigate = useNavigate()

    const [token, setToken] = useState<string>('')
    const [updateItem, setUpdateItem] = useState({} as UpdateItem)
    const [isLoading, setIsloading] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [modalErrMsg, setModalErrMsg] = useState('')
    const [loadedData, setLoadedData] = useState<LoadedData[]>([])
    const [userId, setUserId] = useState('')
    const [taskId, setTaskId] = useState('')
    const [dspName, setDspName] = useState('')
    const [delModal, setDelModal] = useState(false)
    const [file, setFile] = useState('')
    const [isFileValid, setIsFileValid] = useState(false)
    const [profileImg, setProfileImg] = useState('')
    const [tokenExpDate, setTokenExpDate]= useState <number | null>()
    const [logoutModal, setLogoutModal] = useState(false)
    const [modalMsg, setModalMsg] = useState('')
    const [show, setShow] = useState(false)
    const [taskActionType, setTaskActionType] = useState('')
 

   
     
  console.log(taskActionType)
  

  
      const login =  useCallback((id:string, name:string, image:string, token:string, tokenDuration:number)=>{
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
        showLoading()
        setToken(()=> '')
        setTokenExpDate(null)
        setModalShow(false)
        localStorage.removeItem('userData')
        hideLoading()
        return navigate('/login')
      }, [])
      
      let timeoutId: any;
      useEffect(()=>{
        if(tokenExpDate){
          const minutesLeft = tokenExpDate - new Date().getTime()
          
          timeoutId = setTimeout(logout, minutesLeft)
          console.log(typeof timeoutId);
          
        }else{
            clearTimeout(timeoutId)
        }
      }, [tokenExpDate, logout])
      

      useEffect(()=>{
        type UserData = {
          token: string
          userId: string
          name: string
          tokenExpirationDate: number
          image: string
        }
        const retrieveData = (): UserData =>{
         const userData = localStorage.getItem('userData')
         return userData ? JSON.parse(userData): null
        } 
        const storedData = retrieveData()
        console.log(storedData);
        if(storedData && storedData.token && storedData.tokenExpirationDate > new Date().getTime()){
          login(storedData.userId, storedData.name, storedData.image, storedData.token, storedData.tokenExpirationDate)
        }
      }, [token])
  
   const showLoading= () =>{
    return setIsloading(()=> true)
   }
   const hideLoading = ()=>{
    return setIsloading(()=> false)
   }
   
   console.log(props);
   return(
     <section>
     <Contexts.Provider value={
       {auth:{token, login,  logout}, data: {updateItem, setUpdateItem}, loading: {isLoading: isLoading, showLoading, hideLoading}, modal: {modalMsg, setModalMsg, logoutModal, setLogoutModal, modalShow, setModalShow, modalErrMsg, setModalErrMsg, delModal, setDelModal}, responseData: {loadedData, setLoadedData, userId, setUserId, dspName, setDspName, taskId, setTaskId}, files:{file, setFile, isFileValid, setIsFileValid, profileImg, setProfileImg}, logoutContext:{show, setShow}, task:{taskActionType, setTaskActionType}
     }
   }>
    
               {props.children}
     </Contexts.Provider>
     </section>
    )
}
export {ContextProvider}