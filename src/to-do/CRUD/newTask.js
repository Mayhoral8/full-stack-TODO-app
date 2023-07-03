import React from "react";
import InputController from "./input-handler";




const Newplace = ()=>{

const initialState = {
            title: '',
            titleValid: {isValid: false, errorType: 'title cannot be empty'},
            isTitleTouch: false,
            description: '',
            category: '',
            time: '', 
            timeValid: false,
            isTimeTouch: false
        }
return(
<>
    <InputController firstState = {initialState} title = 'Add a new place' button = 'Create Task'/>
    </>
)
}

export default Newplace