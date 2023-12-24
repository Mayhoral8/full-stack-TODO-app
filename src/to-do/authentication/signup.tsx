import React, { useContext, useState } from 'react'
import Input from './input'
import { Contexts } from '../context/context.tsx'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../../hooks/form-hook'
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../validators'
import { v4 as uuidv4 } from 'uuid';
import { useHttp } from '../../hooks/http-hook.tsx'

const Signup = ()=> {

const server = process.env.REACT_APP_SERVER_URL

const { files} = useContext(Contexts)



const [tempImgId, setTempImgId] = useState(uuidv4())    
const [fbImgUrl, setFbImgUrl] = useState('')
const [formState, inputHandler] = useForm(
  {
  name:{
    value: '',
    isValid: false
  },
  email:{
    value: '',
    isValid: false
  },
  phone:{
    value: '',
    isValid: false
  },
  password:{
    value: '',
    isValid: false
  }
}, false)
const api = '/api/users/signup'
  const navigate = useNavigate()
  const {token} = useContext(Contexts).auth

  const signUpData = {
      name: formState.inputs.name.value,
      email: formState.inputs.email.value,
      phoneNumber: formState.inputs.phone.value,
      password: formState.inputs.password.value
  }
  const header = {
    'Content-Type': 'application/json'
   }
const httpBody = {
  method: 'POST',
  body: JSON.stringify(signUpData),
  headers: header
}
  console.log(signUpData.name)
  const [signupHandler] = useHttp(httpBody,  api, 'signup')


  if(!token){
    return (
      <div>
    <div className={`z-20 mt-10 text-xs  mx-auto px-2 w-72 rounded-md`}>
      <h3 className='text-xl text-center text-yellow-400'>Signup</h3>
    <div className=' px-4 grid gap-y-2 h-4/5 bg-gray-900 mt-2 py-5 '>
      <form onSubmit={signupHandler}>
         <Input id='name' type='text' validators={[VALIDATOR_REQUIRE()]} onInput = {inputHandler} errMsg = 'field cannot be empty'/>
         <Input id='email' type='email' validators={[VALIDATOR_EMAIL()]} onInput = {inputHandler} errMsg = 'email is invalid'/>
         <Input id='phone' type='text' validators={[VALIDATOR_REQUIRE()]} onInput = {inputHandler} errMsg = 'field cannot be empty'/>
         <Input id='password' type='password' validators={[VALIDATOR_MINLENGTH(6)]} onInput = {inputHandler} errMsg = 'password must be at least 6 characters'/>
        <button type='submit' disabled={!formState.isValid} className='w-16 h-6 bg-yellow-400 block mx-auto rounded-md'>Login</button>
      </form>
</div>
</div>
      </div>
    )
  }
    else{
        return navigate('/signup')
    }
  }

export default Signup