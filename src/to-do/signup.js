import React, { useReducer, useContext } from 'react'
import Formhandler from './form-handler'
import { Contexts } from './context/context'
import { useNavigate } from 'react-router-dom'



const Signup = ()=> {
  const navigate = useNavigate()
  const {isLoggedIn} = useContext(Contexts).auth
  console.log(isLoggedIn)

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