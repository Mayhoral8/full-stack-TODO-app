import React, {useContext, useEffect} from 'react'
import { Contexts } from '../context/context'
import styled from "styled-components"
import Aos from "aos";


const Modal = ()=>{
    useEffect(() => {
        Aos.init({ duration: 600 });
      }, []);

    const {modal, responseData} = useContext(Contexts)
    const {setModalShow, modalShow, modalErrMsg, delModal} = modal
    const {deleteHandler} = useContext(Contexts).responseData

    const handleShow = ()=>{
        setModalShow(false)
    }
    const delModalMsg = 'Are you sure you want to delete this task?' 
        console.log(modalShow)
    if(modalShow){
        return(
            <>
            <ModalStyle>

    <div data-aos="fade-up"
                  data-aos-easing="ease-in"
                  data-aos-duration="600" className='bg-gray-900 border-2 grid-rows-3 py-auto space-y-5 border-yellow-400 place-content-center rounded-md w-72 z-10  h-52 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2'>
   <div className='text-center mt-2'>
   <i className="fa-solid fa-circle-xmark text-red-600 text-4xl"></i>
   </div>
   <div className='text-white text-center'>
   <h3 className=''>{delModal ? delModalMsg : modalErrMsg}</h3>
   </div>
   <div className={`text-center ${delModal ? 'grid grid-cols-2 gap-x-2': null }`}>
   { delModal ? <button onClick={handleShow} className="ml-auto border hover:bg-yellow-500 hover:text-white drop-shadow-md rounded-lg text-yellow-400 w-20 h-10 text-sm">No</button> : null}
   <button onClick={delModal ? deleteHandler : handleShow} className="border hover:bg-yellow-500 hover:text-white drop-shadow-md rounded-lg text-yellow-400 w-20 h-10 text-sm">{delModal ? 'Yes' : 'Close'}</button> 
   </div>

    </div>
                      </ModalStyle>
    </>
)
} else{
    return null
}
}
const ModalStyle = styled.div`
position: fixed;
top: 0;
bottom: 0;
right: 0;
left: 0;
display: flex;
z-index: 10;
align-items: center;
justify-content: center;
background: rgba(0, 0, 0, 0.8);
`;
export default Modal