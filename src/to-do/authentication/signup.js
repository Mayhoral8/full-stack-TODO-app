import React, { useReducer, useContext } from 'react'
import Formhandler from './auth-handler'
import { Contexts } from '../context/context'
import { useNavigate } from 'react-router-dom'



const Signup = ()=> {
  const navigate = useNavigate()
  const {token} = useContext(Contexts).auth


  if(!token){
    return (
      <div>
      <h3 className='mt-16 text-xl text-center text-yellow-400'>Signup</h3>
     <Formhandler type = 'Signup' isValid = {true}/>
      </div>
    )
  }
    else{
        return navigate('/signup')
    }
  }

export default Signup