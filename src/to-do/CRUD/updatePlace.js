import React from "react";
import InpuController from "./input";
import InputController from "./input";

const UpdatePlace = ()=>{
    const initialState = {
        title: 'hi',
        titleValid: {isValid: true, errorType: 'title cannot be empty'},
        isTitleTouch: false,
        description: 'hello',
        category: '',
        time: '09:53', 
        timeValid: true,
        isTimeTouch: false
    }
    return(
        <InputController firstState = {initialState} title = 'Update place' button = 'Update'/>
        )
}

export default UpdatePlace