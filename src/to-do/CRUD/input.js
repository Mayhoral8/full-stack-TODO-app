import React, {useReducer, useEffect, useContext} from "react";
import { validate } from "../validators";
import { Contexts } from "../context/context.tsx";

const Input = (props)=>{
const {taskActionType, setTaskActionType} = useContext(Contexts).task


const taskMode = taskActionType === 'update'

    const initialState = {
        value: '',
        isTouch: false,
        isValid: false
    }


    const reducer = (state, action)=>{
        switch(action.type){
            case 'INPUT':
                return {...state, value: action.val, isValid: validate(action.val, props.validators).isValid};
            case 'touch':
                return {...state, isTouch: true}
            default:
                return state
        } 

    }
const [state, dispatch] = useReducer(reducer, initialState)

const touchHandler = ()=>{
    dispatch({type: 'touch'})
}

useEffect(()=>{
    props.onInput(state.value, props.id, state.isValid);
}, [state.value, props.id, state.isValid])



const inputHandler = (e)=>{
    e.preventDefault();
    setTaskActionType('')
    dispatch({type: 'INPUT', val: e.target.value})
}

return(
    <>
    <div className="grid grid-rows-2">

    {(props.element === 'input' && <input className="h-full px-2" type={props.type} value={taskMode ? props.value : state.value} id={props.id} onBlur={touchHandler} onChange={inputHandler}/>) || (props.element === 'textArea' && <textarea className='h-full px-2 items-center' type={props.type} value={state.value} id={props.id} onBlur={touchHandler} onChange={inputHandler}/>) || (props.element === 'select' && <select
        type = {props.type}
        id = {props.id}
        className="border px-4 drop-shadow-md h-full rounded-md"
        onChange={inputHandler}
        >
        <option value="">---Category---</option>
        <option value="Health" >Health</option>
        <option value="Fitness">Fitness</option>
        </select>)}
        <p className="text-red-500">{!state.isValid && state.isTouch && props.errMsg}</p>
            </div>
    
    </>
)


}
export default Input





