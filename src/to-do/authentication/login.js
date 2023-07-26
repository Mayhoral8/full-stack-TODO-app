import React, { useReducer, useContext } from 'react'
import Formhandler from './auth-handler'
import { Contexts } from '../context/context'


const Login = ()=> {
const {token} = useContext(Contexts).auth
if(!token){
  return (
    <div>
      <h3 className='mt-32 lg:mt-24 text-xl text-center text-yellow-400'>Login</h3>
    <Formhandler  isValid = {true} />
    </div>
    )
  }else{
    return('/login')
  }
}
export default Login