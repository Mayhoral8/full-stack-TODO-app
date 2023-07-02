import React, {useReducer, useContext} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { validate } from './validators'
import { Contexts } from './context/context'
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from './validators'


const initialState = {
    email: '',
    emailVaild: false,
    password: '',
    passwordValid: false,
    userName: '',
    userNameValid: false,       
    isValid: false,
    isTouchName: false,
    isTouchPassword: false,
    isTouchEmail: false,
}

const reducerInputs = (state, action)=>{
    if(action.type === 'email'){
           const newState = {...state, email: action.payload}
          const validation =  validate(newState.email, [VALIDATOR_EMAIL()] )
        
           return {...newState, emailVaild: validation.isValid}
    }else if(action.type === 'password'){
        const newState = {...state, password: action.payload}
        const validation =  validate(newState.password, [VALIDATOR_MINLENGTH(6)] ) 
         return {...newState, passwordValid: validation.isValid}
    }else if(action.type === 'clear'){
        return initialState
    }else if(action.type === 'name'){
        const newState = {...state, userName: action.payload}
          const validation =  validate(newState.userName, [VALIDATOR_REQUIRE()] )   
           return {...newState, userNameValid: validation.isValid}
    }else if(action.type === 'TOUCH'){
        if(action.value === 'name'){
            return {...state, isTouchName: true}
        }else if(action.value === 'email'){
            return {...state, isTouchEmail: true}
        }else if(action.value === 'password'){
            return {...state, isTouchPassword: true}
        }
        
    }
    
}

const Formhandler = (props)=> {
    const auth = useContext(Contexts).auth
const navigate = useNavigate()
 const {type, isValid} = props;
    
 const [state, dispatch] = useReducer(reducerInputs, initialState)

const isSignupValid = state.emailVaild && state.passwordValid && state.userNameValid
const isLoginValid = state.emailVaild && state.passwordValid 
const isFormValid = isLoginValid && isSignupValid

const nameTxtError = !state.userNameValid && type && state.isTouchName
const emailTxtError = !state.emailVaild && state.isTouchEmail
const passTxtError = !state.passwordValid && state.isTouchPassword

const emailHandler = (e)=>{
    dispatch({type: 'email', payload: e.target.value})
}
const passwordHandler = (e)=>{
        dispatch({type:'password', payload: e.target.value})
}
const nameHandler= (e)=>{
    dispatch({type: 'name', payload: e.target.value})
}

const signUpData = {
    name: state.userName,
    email: state.email,
    password: state.password
}

const submit = async (e)=>{
    e.preventDefault()
       if(type && isSignupValid){
        fetch('http://localhost:5000/api/users/signup',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signUpData)
     })
       }
       else{
        auth.login()
        console.log(auth, auth.isLoggedIn)
        
       }
   return  dispatch({type: 'clear'})
}

const touchHandler = (value)=>{
        dispatch({type: 'TOUCH', value})
}

  return (
  
 <div className='h-72'>
    <form onSubmit={submit} autoComplete='off'>
        
    <div className={`absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 mx-2 w-72 bg-gray-900 rounded-md ${type ? 'h-96' : 'h-72'}`}>  
    <div className='grid-rows-2 grid gap-y-2 mt-10 px-2'>           
    <label className={`${type ?  'block': 'hidden'} text-white`}>Name</label>
    {type ? <input className={`${state.userNameValid || !state.isTouchName ?  'border-yellow-400 border-solid border-2 focus:outline-none focus:ring focus:ring-yellow-400': 'border-red-500 border-2 focus:outline-none' }`} onBlur={()=>touchHandler('name')} type='text' value={state.userName} onChange={(e)=> nameHandler(e)}/>: null}
    {nameTxtError ? <span className='text-red-500 text-sm'>name cannot be empty</span> : null}
    <label className='text-white'>Email</label>
    <input className={`${state.emailVaild || !state.isTouchEmail ? 'border-yellow-400 border-solid border-2 focus:outline-none focus:ring focus:ring-yellow-400': 'border-red-500 border-2 focus:outline-none' }`}   onBlur={()=>touchHandler('email')} type='email' value={state.email} onChange={(e)=> emailHandler(e)}/>
    {emailTxtError ? <span className='text-red-500 text-sm'>invalid email format</span> : null}

    <label className='text-white'>Password</label>
    <input  className={`${state.passwordValid || !state.isTouchPassword ? 'border-yellow-400 border-solid border-2 focus:outline-none focus:ring focus:ring-yellow-300 ' :'border-red-500 border-2 focus:outline-none' }`} type='password' onBlur={()=>touchHandler('password')} value={state.password} onChange={(e)=> passwordHandler(e)}/>
    {passTxtError ? <span className='text-red-500 text-sm'>Password must be at least six characters</span> : null}
    <div className='mx-auto'>

    {type ? <button disabled={!isSignupValid} type='submit' className={`text-center mt-10 ${isSignupValid ? 'bg-yellow-400':'bg-gray-200'} w-44 rounded-md text-gray-900 h-8`}>{type}</button> : <button disabled={!isLoginValid} type='submit' className={`text-center mt-10 ${isLoginValid ? 'bg-yellow-400':'bg-gray-200'} w-44 rounded-md  h-8`}>{type? 'Signup': 'Login'}</button> }
    </div>
    </div>
    </div>
    </form>
    
    </div>
  )
}
export default Formhandler