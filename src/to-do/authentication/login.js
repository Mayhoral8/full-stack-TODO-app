import React, { useReducer, useContext } from 'react'
import Formhandler from './auth-handler'
import { Contexts } from '../context/context'


const Login = ()=> {
const {token} = useContext(Contexts).auth
if(!token){
  return (
    <Formhandler  isValid = {true} />
    )
  }else{
    return('/login')
  }
}
export default Login