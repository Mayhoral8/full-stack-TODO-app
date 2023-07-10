import React, { useReducer, useContext } from 'react'
import Formhandler from './auth-handler'
import { Contexts } from './context/context'
import { useNavigate } from 'react-router-dom'



const Signup = ()=> {
  const navigate = useNavigate()
  const {isLoggedIn} = useContext(Contexts).auth


  if(!isLoggedIn){
    return (
     <Formhandler type = 'Signup' isValid = {true}/>
    )
  }
    else{
        return navigate('/places/u1')
    }
  }

export default Signup