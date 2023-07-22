import React, { useReducer, useContext } from 'react'
import Formhandler from './auth-handler'
import { Contexts } from '../context/context'
import { useNavigate } from 'react-router-dom'



const Signup = ()=> {
  const navigate = useNavigate()
  const {token} = useContext(Contexts).auth


  if(!token){
    return (
     <Formhandler type = 'Signup' isValid = {true}/>
    )
  }
    else{
        return navigate('/signup')
    }
  }

export default Signup