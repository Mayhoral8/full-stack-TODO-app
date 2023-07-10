import React, {useReducer, useContext} from "react";
import { validate, VALIDATOR_REQ_MAX, VALIDATOR_REQUIRE } from "../validators";
import { data } from "../data";
import { useNavigate } from "react-router-dom";
import { Contexts } from "../context/context";




const InputController = (props)=>{
  const {userId, taskId} = useContext(Contexts).responseData
  const {hideLoading, showLoading} = useContext(Contexts).loading
  const {setModalErrMsg, setModalShow} = useContext(Contexts).modal
    const {firstState, button, title} = props 
    const reducer = (state, action)=>{
        switch(action.type){
              case 'title':{
                const newState = {...state, title: action.payload}
              const validation =  validate(newState.title, [VALIDATOR_REQ_MAX(50)] )
               return {...newState, titleValid: validation}
                }
              case 'description':{
                return {...state, description: action.payload}
              }
              case 'category':{
                return {...state, category: action.payload, categoryValid: validate(state.category, [VALIDATOR_REQUIRE])}
              }
              case 'time':{
                const newState = {...state, time: action.payload}
              const validation =  validate(newState.time, [VALIDATOR_REQUIRE()] )
               return {...newState, timeValid: validation.isValid}
              }
              case 'title-touch':{
                return {...state, isTitleTouch: true}
              }
              case 'time-touch':{
                return {...state, isTimeTouch: true}
              }
              default:{
                return state
              }
            }
    
    }
    
    const[state, dispatch] = useReducer(reducer, firstState)
    const navigate = useNavigate();
const titleHandler = (e)=>{
    dispatch({type: 'title', payload: e.target.value})
}

const descriptionHandler = (e)=>{
    dispatch({type: 'description', payload: e.target.value})
}
const categoryHandler = (e)=>{
    dispatch({type: 'category', payload: e.target.value})
}
const timeHandler = (e)=>{
    dispatch({type: 'time', payload: e.target.value})
}

const touchHandler = (type)=>{
    if(type=== 'title'){
    dispatch({type: 'title-touch'})
    }else
    dispatch({type: 'time-touch'})
}

const submitHandler= async (e)=>{
    e.preventDefault();
  // if(type){
  //   return navigate(`/places/${creator}`)
  // }
  console.log(taskId)
    const newPlace = {
       title: state.title,
       description: state.description,
       category: state.category,
       time: state.time,
       creator: userId      
    }
    if(button === 'Create Task'){
    try{
        
      
      showLoading(true)
      const response = await fetch('http://localhost:5000/api/tasks',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPlace)
      })
      const responseData = await response.json()
      if(!response.ok){
        throw new Error(responseData.message)
      }
      navigate(`/${userId}/tasks`)
      hideLoading(true)
    }catch(err){
      hideLoading(true)
      setModalShow(true)
      setModalErrMsg(err.message)
    }
  } else if(button === 'Update'){
      try{
        showLoading(true)
        const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`,{
          method: 'PATCH',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newPlace)
        })
        const responseData = await response.json()
        if(!response.ok){
          throw new Error(responseData.message)
        }
        navigate(`/${userId}/tasks`)
        hideLoading(true)
      }catch(err){
        hideLoading(true)
        setModalShow(true)
        setModalErrMsg(err.message)
      }
    }
   
}

const titleErrShw = !state.titleValid.isValid && state.isTitleTouch
const titleErrMsg = state.titleValid.errorType

const timeErrShw = !state.timeValid && state.isTimeTouch
const timeErrMsg = 'time is required'

const isFormValid = state.titleValid.isValid && state.timeValid

 




    return(
        <div className="border-2 lg:w-2/5 lg:mx-auto mx-20 mt-20 bg-gray-900 py-2 border-yellow-400 rounded-md">
            <h3 className="text-center text-white ">{title}</h3>
        <form onSubmit={submitHandler}className="grid grid-rows-5 gap-y-8 mx-2 mt-4">
        <div>
        <input placeholder="Title" onBlur={()=> touchHandler('title')} className="w-full h-full border drop-shadow-md rounded-md" value={state.title} onChange={titleHandler}/>
        {titleErrShw ? <p className="text-red-400 text-sm">{titleErrMsg}</p> : null}
        </div>
        <textarea placeholder="Description" className="h-dborder drop-shadow-md rounded-md" value={state.description} onChange={descriptionHandler}/>
        <select
        name=""
        className="border py-2 px-4 pb-2 drop-shadow-md rounded-md"
        onChange={categoryHandler}
        >
        <option value="">---Category---</option>
        <option value="Health" >Health</option>
        <option value="Fitness">Fitness</option>
        </select>
        <div>
        <input required placeholder='time' value={state.time} onBlur={touchHandler} type="time" className=" w-full h-full border drop-shadow-md rounded-md" onChange={timeHandler}/>  
        {timeErrShw ? <p className="text-red-400 text-sm">{timeErrMsg}</p> : null}
        </div>
        <div className="grid grid-cols-2 w-44 mx-auto gap-x-2">
        <button className="border drop-shadow-md rounded-lg text-yellow-400 text-sm">Cancel</button> 
        <button type="submit" disabled={!isFormValid} className={`${!isFormValid ? 'border rounded-lg bg-gray-200 text-gray-300 text-sm': 'border drop-shadow-md rounded-lg  bg-yellow-400 text-sm'}`}>{button}</button> 
        </div>
        </form>
        </div>    
        )
}

export default InputController