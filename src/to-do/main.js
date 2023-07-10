import React, {useState, useEffect, useContext} from 'react'
import Items from './items'
import { useParams, useNavigate } from 'react-router-dom'
import { Contexts } from './context/context'

 const Main = ()=>{
    const {loading, modal, responseData, files} = useContext(Contexts)
    const {loadedData, setLoadedData, userId, setTaskId, dspName} = responseData
    const { hideLoading, showLoading} = loading
    const { setModalShow, setModalErrMsg, delModal} = modal
    const { profileImg } = files

    const navigate = useNavigate()
useEffect(()=>{
    showLoading(true)
    fetch(`http://localhost:5000/api/tasks/${userId}`).
    then((result)=>{
        if(result.ok){    
         result.json().
         then((result)=>{
              setLoadedData(()=> result.message)
              console.log(result.message)
              hideLoading(true)
            })
        }else if(!result.ok){
            throw new Error(result.message)
        }
        hideLoading(true)
    }).catch((err)=>{
        hideLoading(true)
        setModalShow(true)
        setModalErrMsg(err.message)
        console.log(err)
    })
    
   
}, [delModal])
console.log(userId)
const navigateHandler = ()=>{
    return navigate('/newPlace')
}



//     const [storedItems, setStoredItems] = useState(loadedItems)

    return<>
    <div className='flex flex-row justify-between px-4 lg:px-4 mt-6 font-bold'>
        <div className='grid grid-cols-2 '>
        <img src={`http://localhost:5000/${profileImg}`} alt='' className='rounded-full border-2 w-16 h-16'/>
        <h3 className='text-center my-auto text-sm'>Hi, {dspName}</h3>
        </div>
        <div className='flex'>
        <h3 className='my-auto'>Current Tasks:</h3><span className={`${loadedData.length === 0 ? 'text-red-600': 'text-yellow-400'} pl-1 my-auto`}>{loadedData.length}</span>
            </div>
    </div>
    {loadedData.length === 0 ?
    <div className='mt-32 text-center grid grid-rows-2 gap-y-3'>

     <h3 className='lg:text-4xl text-xl font-bold'>You currently have no tasks</h3>
     <button onClick={navigateHandler} className='h-10 mx-auto w-36 rounded-lg text-black bg-yellow-300 '>Create a new task</button>
    </div>
     : <section className=" grid mx-24 mt-10 grid-cols-1 gap-y-6 gap-x-4 lg:grid-cols-3 md:grid-cols-2 min-h-fit">
    {loadedData.map((data, index)=>{
    return <Items key = {data.id} id={data.id} title = {data.title} description = {data.description} creator = {data.creator} itemData = {loadedData} itemDataLogic = {setLoadedData} />
})}
  
    </section>}
    
</> 
}
export default Main