import React, { useContext, useEffect, useState } from 'react'
import { Contexts } from '../context/context'
import styled from "styled-components"
import Aos from "aos";
import { useNavigate } from 'react-router-dom';


const Modal = () => {
  const server = process.env.REACT_APP_SERVER_URL

    const navigate = useNavigate()
    useEffect(() => {
        Aos.init({ duration: 600 });
    }, []);

    const { modal, responseData, auth, loading, logoutContext } = useContext(Contexts)
    const { logout, token } = auth
    const { showLoading, hideLoading } = loading
    const { taskId, userId } = responseData
    const { setLogoutModal, logoutModal, setModalShow, modalShow, modalErrMsg, delModal, setDelModal, setModalErrMsg, modalMsg, setModalMsg } = modal
    const { setShow, show } = logoutContext

    const handleShow = () => {
        setModalShow(false)
        setShow(!show)
    }

    const deleteHandler = async (e) => {
        console.log('clicked')
        setModalShow(false)
        showLoading()
        try {
            console.log(taskId)
            const response = await fetch(`${server}/api/tasks/${taskId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token
                    }

                })
            const responseData = await response.json()
            if (!response.ok) {
                throw new Error(responseData.message)
            }
            hideLoading()
            setDelModal(false)
            return navigate(`/${userId}/tasks`)
        } catch (err) {
            hideLoading()
            setDelModal(false)
            setLogoutModal(false)
            setModalShow(true)
            setModalErrMsg(err.message)
            console.log(err)
        }
    }
    const modalFunc = () => {
        if (delModal) {
            deleteHandler()
        } else if (logoutModal) {
            logout()
        } else {
            setModalShow(false)
        }
    }


    if (modalShow) {
        return (
            <>
                <ModalStyle>

                    <div data-aos="fade-up"
                        data-aos-easing="ease-in"
                        data-aos-duration="600" className='bg-gray-900 border-2 grid grid-rows-3  border-yellow-400 place-content-center rounded-md lg:w-96 w-64 z-10  h-52 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all ease-in'>
                        <div className='text-center mt-2'>
                            {delModal || logoutModal ? < i className="fa-solid fa-circle-info text-yellow-400 text-4xl" /> : <i className="fa-solid fa-circle-xmark text-red-600 text-4xl" />}
                        </div>
                        <div className='text-white text-center'>
                            <h3 className='text-sm lg:text-base'>{delModal || logoutModal ? modalMsg : modalErrMsg}</h3>
                        </div>
                        <div className={` mx-auto ${delModal || logoutModal ? 'grid grid-cols-2 gap-x-4' : null}`}>
                            {delModal || logoutModal ? <button onClick={handleShow} className="ml-auto border hover:bg-yellow-500 hover:text-white drop-shadow-md rounded-lg text-yellow-400 w-20 h-10 text-sm">No</button> : null}
                            <button onClick={modalFunc} className="border hover:bg-yellow-500 hover:text-white drop-shadow-md rounded-lg text-yellow-400 w-20 h-10 text-sm">{delModal || logoutModal ? 'Yes' : 'Close'}</button>
                        </div>

                    </div>
                </ModalStyle>
            </>
        )
    } else {
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
z-index: 40;
align-items: center;
justify-content: center;
background: rgba(0, 0, 0, 0.8);
`;
export default Modal