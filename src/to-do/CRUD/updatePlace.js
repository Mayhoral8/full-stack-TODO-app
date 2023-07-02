import React, {useContext, useState} from "react";
import InpuController from "./input";
import InputController from "./input";
import { Contexts } from "../context/context";
import {data} from '../data'


const UpdatePlace = ()=>{
    const data = useContext(Contexts).data
    const {updateItem, setUpdateItem} = useContext(Contexts).data
    
    const {title, description, time, category} = updateItem

    const initialState = {
        title,
        titleValid: {isValid: true, errorType: 'title cannot be empty'},
        isTitleTouch: false,
        description,
        category,
        time,
        timeValid: true,
        isTimeTouch: false
    }
    return(
        <InputController type='update' firstState = {initialState} title = 'Update place' button = 'Update'/>
        )
}

export default UpdatePlace