import React, {useContext} from "react";
import Input from "./input";
import { VALIDATOR_REQUIRE, VALIDATOR_REQ_MAX} from "../validators";
import { Contexts } from "../context/context";
import { useForm } from "../../hooks/form-hook";
import { useHttp } from "../../hooks/http-hook";


type TaskProps = {
    type: string
}
const Task = (props: TaskProps)=>{
  const {token} = useContext(Contexts).auth
  const {updateItem} = useContext(Contexts).data
  const { userId, taskId} = useContext(Contexts).responseData
const {taskActionType} = useContext(Contexts).task





    const [formState, inputHandler] = useForm({
        title:{
            value: '',
            isValid: false
        },
        description:{
            value: '',
            isValid: false
        },
        category:{
            value: '',
            isValid: false
        },
        time:{
            value:'',
            isValid: false
        }
    }, false)


const newStatement = props.type === 'new'
const updateStatement = props.type === 'update'

const api = `api/tasks/${updateStatement && taskId}`

const method = (newStatement && 'POST') || (updateStatement && 'PATCH')
const header = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token
}

const newTaskData = {
    title: formState.inputs.title.value,
    description: formState.inputs.description.value,
    category: formState.inputs.category.value,
    time: formState.inputs.time.value,
    creator: userId
}
const httpBody = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(newTaskData)
}
const [httpHandler] = useHttp(httpBody, api, 'newTask')

return(
<>  <div className="border-2 lg:w-2/5 w-10/12   mx-auto mt-20 bg-gray-900 py-2 border-yellow-400 rounded-md">
    <form className="grid grid-rows-5 mt-10 mx-2 lg:h-96" onSubmit={httpHandler}>
<Input type='text' id='title' element='input' validators = {[VALIDATOR_REQ_MAX(50)]} errMsg='title' onInput={inputHandler} value={taskActionType && updateItem.title}/>
<Input type='text' id='description' element='textArea' validators = {[VALIDATOR_REQ_MAX(100)]} errMsg = 'err' onInput={inputHandler} description={taskActionType && updateItem.description}/>
<Input type='select' id='category' element='select' validators = {[VALIDATOR_REQUIRE]} errMsg = 'Man' onInput={inputHandler} category={taskActionType && updateItem.category}/>
<Input type='time' id='time' element='input' validators = {[VALIDATOR_REQUIRE]} errMsg = 'time is required' onInput={inputHandler} value={taskActionType && updateItem.time}/>
<button className="bg-yellow-400 w-28 mx-auto rounded-md h-10" disabled={!formState.isValid} type='submit'>{newStatement && 'Add task' || updateStatement && 'Update task'}</button>
    </form>
</div>

    </>
)
}

export default Task