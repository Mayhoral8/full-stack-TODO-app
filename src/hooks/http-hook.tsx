import  {useContext} from "react";
import { Contexts } from "../to-do/context/context.tsx";
import {  useNavigate } from "react-router-dom";
import {  toast } from 'sonner';

  export const useHttp = (httpBody: Object, api: string, type: string)=>{
    const navigate = useNavigate()
    const {auth, loading, modal} = useContext(Contexts)
    const {userId} = useContext(Contexts).responseData
    const {showLoading, hideLoading} = loading
    const { setDelModal, setLogoutModal, setModalShow, setModalErrMsg, modalErrMsg} = modal

    
const httpFunction = async(httpBody: Object, api:string | Boolean, type: string)=>{
  console.log(api)
  setModalShow(false)
  const server = process.env.REACT_APP_SERVER_URL
    console.log(type)
    showLoading() 
    try {
      const response = await fetch(`${server}${api}`, httpBody)
      const responseData = await response.json()
      if (!response.ok) {
          throw new Error(responseData.message)
      }
      hideLoading()
      if(type === 'newTask' || type === 'delete'){
        console.log('clicked')
      navigate(`/${userId}/tasks`)
       toast.success(type === 'delete' && 'Task deleted' || 'Task created')

      } else{
        auth.login(responseData.userId, responseData.name, responseData.image, responseData.token)
      }
    hideLoading()
    setDelModal(false) 

  } catch (err: any) {
      hideLoading()
      setDelModal(false)
      setLogoutModal(false)
      setModalShow(true)
      setModalErrMsg(err.message === 'Failed to fetch' ? 'No internet connection' : err.message)
      console.log(err.message) 
      
  }
  }

 const httpHandler = (e: any)=>{
  if(type !== 'delete'){
    e.preventDefault()
  }
    httpFunction(httpBody, api, type)
 }
return [httpHandler]
}