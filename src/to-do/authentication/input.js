import React, {useReducer, useEffect} from "react";
import { validate } from "../validators";

const Input =(props)=>{
    
    const reducer = (state, action)=>{
        if(action.type === 'change'){
            return {...state, value: action.val, isValid: validate(action.val, action.validators).isValid}
        }else if(action.type === 'touch'){
            return {...state, isTouch: true}
        }
    }
    const initialState = {
        value: '',
        isValid: false,
        isTouch: false
    }

    const [state, dispatch] = useReducer(reducer, initialState)
    
    const inputHandler = (e)=>{
        e.preventDefault()
      
        return dispatch({type:'change', val: e.target.value, validators: props.validators}) 
    }

    const touchHander = ()=>{
        dispatch({type: 'touch'})
    }

   useEffect(()=>{
        props.onInput(state.value, props.id, state.isValid)
   }, [state.value, props.id, state.isValid])

const capitalize = props.id.replace(props.id[0], props.id[0].toUpperCase())

    return(
        <React.Fragment>
            <div className="grid grid-rows-3 py-auto">
            <label className="text-white ">{capitalize}</label>
            <input name={props.id} type={props.type} value={state.value} onChange={inputHandler} onBlur={touchHander} className="border w-full "/>
            <p className="text-red-500 text-xs">{state.isTouch && !state.isValid && props.errMsg}</p>
            </div>
        </React.Fragment>
    )
}

export default Input