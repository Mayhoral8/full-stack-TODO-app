import React, {useContext} from "react";
import InputController from "./input-handler";
import { Contexts } from "../context/context";



const UpdatePlace = ()=>{
    const {updateItem} = useContext(Contexts).data
    
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