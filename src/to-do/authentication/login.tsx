import React, {useContext } from 'react'
import Input from './input'
import { Contexts } from '../context/context.tsx'
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../validators'
import { useForm } from '../../hooks/form-hook'
import { useHttp } from '../../hooks/http-hook.tsx'

const Login = ()=> {
const {auth} = useContext(Contexts)
const {token} = auth

const [formState, inputHandler] = useForm(
  {
    email:{
      value: '',
      isValid: false
    },
    password:{
      value: '',
      isValid: false
  }
 },
 false
 )

 const loginData = {
  email: formState.inputs.email.value,
  password: formState.inputs.password.value
 }

 const header = {
  'Content-Type': 'application/json'
 }

 const httpBody = {
  method: 'POST',
  headers: header,
  body: JSON.stringify(
   loginData
  )
}
const api = '/api/users/login'
const [loginHandler] = useHttp(httpBody, api, 'login' )


if(!token){
  return (
    <div className={`z-20 mt-20  mx-auto px-2 w-72 rounded-md`}>
      <h3 className='text-xl text-center text-yellow-400'>Login</h3>
    <div className=' px-4  gap-y-2 h-64 bg-gray-900 mt-2 py-5 block'>
      <form onSubmit={loginHandler}>
    <Input id='email' type='email' validators={[VALIDATOR_EMAIL()]} onInput = {inputHandler} errMsg = 'invalid email'/>
    <Input id='password' type='password' validators={[VALIDATOR_MINLENGTH(6)]} onInput = {inputHandler} errMsg = 'password must be at least 5 characters'/>
    <button type='submit' disabled={!formState.isValid} className='bg-yellow-400 mx-auto block w-full rounded-md'>Login</button>
      </form>
      </div>
    </div>
    )
  }else{
    return('/login')
  }
}
export default Login