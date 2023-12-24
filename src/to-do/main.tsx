import React, {useEffect, useContext} from 'react'
import Items from './items'
import {useNavigate } from 'react-router-dom'
import { Contexts } from './context/context.tsx'


 const Main = ()=>{
    const server = process.env.REACT_APP_SERVER_URL
    const {loading, modal, responseData, auth} = useContext(Contexts)
    const {loadedData, setLoadedData, userId} = responseData
    const { hideLoading} = loading
    const { setModalShow, setModalErrMsg, delModal} = modal


    const navigate = useNavigate()
    
useEffect(()=>{
  const server = process.env.REACT_APP_SERVER_URL
    if (userId){
        const getTasks = async ()=>{
            try{
            const response = await fetch(`${server}/api/tasks/${userId}`)
            const responseData = await response.json()
            setLoadedData(responseData.message)
            hideLoading(true)
            console.log(response)
            if(!response.ok){
                console.log(response)
            throw new Error(responseData.message)
            }
        }catch(err:any){
            hideLoading(true)
        setModalShow(true)
        setModalErrMsg(err.message)
        console.log(err)
        }
    }
    getTasks()
}else{
    return navigate('/login')
}
}, [delModal, userId, auth.token])

const navigateHandler = ()=>{
    return navigate('/newPlace')
}



if(auth.token){
    return<main>
    <div className='flex flex-row justify-between px-4 lg:px-4 mt-28 font-bold'>
        <div className='mx-auto w-32 flex'>
        <h3 className='text-center '>Current Tasks:</h3><span className={`${loadedData.length === 0 ? 'text-red-600': 'text-yellow-400'} pl-1`}>{loadedData.length}</span>
            </div>
    </div>
    {loadedData.length === 0 ?
    <div className='mt-32 text-center grid grid-rows-2 gap-y-3'>

     <h3 className='lg:text-4xl text-xl font-bold'>You currently have no tasks</h3>
     <button onClick={navigateHandler} className='h-10 mx-auto w-36 rounded-lg text-black bg-yellow-300 '>Create a new task</button>
    </div>
     : <section className="grid lg:mx-24  mt-10 grid-cols-1 gap-y-6 gap-x-4 lg:grid-cols-3 md:grid-cols-2 min-h-fit">
    {loadedData.map((data, index)=>{
        console.log(data);
        
    return <Items key = {data.id} id={data.id} category = {data.category} title = {data.title} description = {data.description} creator = {data.creator} itemData = {loadedData} itemDataLogic = {setLoadedData} />
})}
    </section>}
    
</main> 
}else{
    return navigate('/login')
}
}
export default Main