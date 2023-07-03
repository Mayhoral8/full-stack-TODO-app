import React, {useContext} from 'react'
import { Contexts } from '../context/context'


const Modal = ()=>{
    const {modal} = useContext(Contexts)
    const {setModalShow, modalShow, modalErrMsg} = modal
    console.log(modalErrMsg)
    const handleShow = ()=>{
        setModalShow(false)
    }

    if(modalShow){
        return(
            <>
    <div className='bg-gray-900 border-2 grid-rows-3 py-auto space-y-5 border-yellow-400 place-content-center rounded-md w-72 z-10  h-52 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2'>
   <div className='text-center mt-2'>
   <i class="fa-solid fa-circle-xmark text-red-600 text-4xl "></i>
   </div>
   <div className='text-white text-center'>
   <h3 className=''>{modalErrMsg}</h3>
   </div>
   <div className='text-center'>

   <button onClick={handleShow} className="border hover:bg-yellow-500 hover:text-white drop-shadow-md rounded-lg text-yellow-400 w-20 h-10 text-sm">Close</button> 
   </div>

    </div>
    </>
)
} else{
    return null
}
}

export default Modal