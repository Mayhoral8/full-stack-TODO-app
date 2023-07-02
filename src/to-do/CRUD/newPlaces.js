import React, {useReducer, useEffect} from "react";
import Input from "./form-handler";
import { validate, VALIDATOR_REQ_MAX, VALIDATOR_REQUIRE } from "../validators";
import { data } from "../data";
import { useNavigate, useParams } from "react-router-dom";
import InputController from "./input";




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