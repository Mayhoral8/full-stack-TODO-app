import React, { useReducer, useContext, useState } from 'react'
import { validate } from '../validators'
import { Contexts } from '../context/context.tsx'
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../validators'
import ImageUpload from '../image-upload'
import { storage, storageRef } from '../firebase/firebase-config'
import { uploadBytes, listAll, getDownloadURL, ref, get } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid';






const Formhandler = (props) => {
    const [tempImgId, setTempImgId] = useState(uuidv4())    
    const [fbImgUrl, setFbImgUrl] = useState('')
    const server = process.env.REACT_APP_SERVER_URL
   
    const { auth, loading, modal, responseData, files } = useContext(Contexts)
    const { file, isFileValid, setFile } = files

    const { hideLoading, showLoading } = loading
    const { setModalShow, setModalErrMsg, modalErrMsg, setDelModal, setLogoutModal } = modal
   

    const initialState = {
        email: '',
        emailVaild: false,
        password: '',
        passwordValid: false,
        name: '',
        nameValid: false,
        isValid: false,
        isTouchName: false,
        isTouchPassword: false,
        isTouchEmail: false,
    }

    const reducerInputs = (state, action) => {
        if (action.type === 'email') {
            const newState = { ...state, email: action.payload }
            const validation = validate(newState.email, [VALIDATOR_EMAIL()])

            return { ...newState, emailVaild: validation.isValid }
        } else if (action.type === 'password') {
            const newState = { ...state, password: action.payload }
            const validation = validate(newState.password, [VALIDATOR_MINLENGTH(6)])
            return { ...newState, passwordValid: validation.isValid }
        } else if (action.type === 'clear') {
            return initialState
        } else if (action.type === 'name') {
            const newState = { ...state, name: action.payload }
            const validation = validate(newState.name, [VALIDATOR_REQUIRE()])
            return { ...newState, nameValid: validation.isValid }
        } else if (action.type === 'TOUCH') {
            if (action.value === 'name') {
                return { ...state, isTouchName: true }
            } else if (action.value === 'email') {
                return { ...state, isTouchEmail: true }
            } else if (action.value === 'password') {
                return { ...state, isTouchPassword: true }
            }

        }

    }
    const { type } = props;

    const [state, dispatch] = useReducer(reducerInputs, initialState)

    const isSignupValid = state.emailVaild && state.passwordValid && state.nameValid && isFileValid
    const isLoginValid = state.emailVaild && state.passwordValid


    const nameTxtError = !state.nameValid && type && state.isTouchName
    const emailTxtError = !state.emailVaild && state.isTouchEmail
    const passTxtError = !state.passwordValid && state.isTouchPassword

    const emailHandler = (e) => {
        dispatch({ type: 'email', payload: e.target.value })
    }
    const passwordHandler = (e) => {
        dispatch({ type: 'password', payload: e.target.value })
    }
    const nameHandler = (e) => {
        dispatch({ type: 'name', payload: e.target.value })
    }


    const loginData = {
        email: state.email,
        password: state.password
    }
 
   
// console.log(tempImgId)


   

      const submit = async (e) => {
        let imgUrl;
        e.preventDefault()
        showLoading()
        if (type && isSignupValid && !auth.token) {
        if(file === null)return
        const imageRef = ref(storage, `${tempImgId}/${file.name}`);
       await uploadBytes(imageRef, file)
       const url = await getDownloadURL(ref(storage,  `${tempImgId}/${file.name}`));
    console.log(url)
  
        // const formData = new FormData()
        // formData.append('name', state.name)
        // formData.append('email', state.email)
        // formData.append('password', state.password)
        // formData.append('image', file)
        // formData.append('firebaseImgUrl', url)

        const signUpData = {
            name: state.name,
            email: state.email,
            password: state.password,
            image: url
        }
        try {
            console.log(fbImgUrl, imgUrl)
                const response = await fetch(`${server}/api/users/signup`, {
                    method: 'POST',
                    headers:  {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(signUpData)
                })
                const responseData = await response.json()
                console.log(responseData)
                if (!response.ok) {
                    throw new Error(responseData.message)
                }
                
                
                auth.login(responseData.userId, responseData.name, responseData.image, responseData.token)
                setFile('')
                
                hideLoading(true)
            } catch (err) {
                hideLoading()
                setDelModal(false)
                setLogoutModal(false)
                setModalShow(true)
                setModalErrMsg(err.message)
                console.log(err)
            }
            
        
    }
        else if (!type && isLoginValid && !auth.token) {
            showLoading()
            try {
                const response = await fetch(`${server}/api/users/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginData)
                })
                const responseData = await response.json()
                if (!response.ok) {
                    throw new Error(responseData.message)
                }
                hideLoading()
                console.log(responseData)
                auth.login(responseData.userId, responseData.name, responseData.image, responseData.token)
                setFile('')
            } catch (err) {
                hideLoading()
                setDelModal(false)
                setLogoutModal(false)
                setModalShow(true)
                setModalErrMsg(err.message === 'Failed to fetch' ? 'No internet connection' : err.message)
                console.log(modalErrMsg)
                console.log(err)
            }
        }

    }



    const touchHandler = (value) => {
        dispatch({ type: 'TOUCH', value })
    }

    return (

        <div className='h-72 z-10 '>
        
            <form onSubmit={submit} autoComplete='off'>

                <div className={`z-20 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 px-2 w-72 bg-gray-900 rounded-md ${type ? 'h-auto' : 'h-72'}`}>
                    <div className='grid-rows-2 grid gap-y-2 mt-4 px-2'>
                        {/* <label className={`${type ? 'block' : 'hidden'} text-white`}>Name</label>
                        {type ? <input className={`${state.nameValid || !state.isTouchName ? 'border-yellow-400 border-solid border-2 focus:outline-none focus:ring focus:ring-yellow-400' : 'border-red-500 border-2 focus:outline-none'}`} onBlur={() => touchHandler('name')} type='text' value={state.name} onChange={(e) => nameHandler(e)} /> : null}
                        {nameTxtError ? <span className='text-red-500 text-sm'>Name cannot be empty</span> : null}
                        {type && <ImageUpload />}
                        <label className='text-white'>Email</label>
                        <input className={`${state.emailVaild || !state.isTouchEmail ? 'border-yellow-400 border-solid border-2 focus:outline-none focus:ring focus:ring-yellow-400' : 'border-red-500 border-2 focus:outline-none'}`} type='email' value={state.email} onChange={(e) => emailHandler(e)} />
                        {emailTxtError ? <span className='text-red-500 text-sm'>Invalid email</span> : null}

                        <label className='text-white'>Password</label>
                        <input className={`${state.passwordValid || !state.isTouchPassword ? 'border-yellow-400 border-solid border-2 focus:outline-none focus:ring focus:ring-yellow-300 ' : 'border-red-500 border-2 focus:outline-none'}`} type='password' onBlur={() => touchHandler('password')} value={state.password} onChange={(e) => passwordHandler(e)} />
                        {passTxtError ? <span className='text-red-500 text-sm'>Password must be at least six characters</span> : null}
                        <div className='mx-auto'>

                            {type ? <button disabled={!isSignupValid} type='submit' className={`text-center mt-4 mb-4 ${isSignupValid ? 'bg-yellow-400 text-gray-900' : 'bg-gray-200 '} w-44 rounded-md text-gray-400 h-8`}>{type}</button> : <button disabled={!isLoginValid} type='submit' className={`text-center mt-10 ${isLoginValid ? 'bg-yellow-400' : 'bg-gray-200 text-gray-400'} w-44 rounded-md  h-8`}>{type ? 'Signup' : 'Login'}</button>}
                        </div> */}
                <input name={props.name} type={props.type} />
                    </div>
                </div>
            </form>

        </div>
    )
}
export default Formhandler