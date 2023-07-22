import React, {useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Contexts } from "./context/context";
import Aos from "aos";

// import { data } from "./data";
const Items = (props)=>{
    useEffect(()=>{
    Aos.init({ duration: 2000 });
    })
    const {title, description, id, category, creator, colour, itemData, itemDataLogic} = props
    const data =  useContext(Contexts).loadedData
   
    const {dspName, taskId, setTaskId} = useContext(Contexts).responseData
    const {showLoading, hideLoading} = useContext(Contexts).loading
    const {setModalErrMsg, setModalShow, setModalMsg, setDelModal} = useContext(Contexts).modal



    const {updateItem, setUpdateItem} = useContext(Contexts).data
    // let {itemData} = props
    const navigate = useNavigate()

    // console.log(props)
    const editHandler = ()=>{

        navigate('/newPlace')
    }

    const deleteHandler = async ()=>{
        setModalMsg('Are you sure you want to delete this task?' )
        setDelModal(true)
        setModalShow(true)
        setTaskId(id)
        console.log(taskId)
    }
       
   
     
 const updateHandler = ()=>{
        setUpdateItem(()=>{

          return(       
              {
                  title, 
                  description, 
                  creator, 
                  category 
                }
                ) 
        })
         navigate(`/updatePlace/${id}`)
         setTaskId(id)
         console.log(taskId)
      
    const place = itemData.find((item)=>{
        return item.id === id
    })
 }
return(
    <>
        <article  data-aos="fade-up"
                  data-aos-easing="ease-out"
                  data-aos-duration="1200" className={`${colour ? colour: 'bg-gradient-to-r from-gray-900 to-gray-800'} w-64 mx-auto overflow-hidden text-white drop-shadow-lg grid py-4 px-4 grid-rows-4 border-blue-300 h-56 gap-y-12 rounded-lg`}>
            <div className=" grid grid-cols-2">
        <div className="TEXTS grid   w-56">
        <h1 className="text-l font-bold">{title}</h1>
        </div>
        <div className="ml-auto ">
            
            <i className="fa-duotone fa-grid"/>
            
        </div>
            </div>
        <div className="">
            <p className="text-xs mt-2">{description}</p>
        </div>
            <div className="DATE ">
            <h6 className="">{category}</h6>
            </div>
            <div className="CONFIGS text-center justify-end grid-cols-3 gap-x-14 px-2 py-2 rounded-lg grid mx-auto bg-gray-100 h-20 w-52">
            <i title="edit" onClick={updateHandler} className="fa-solid fa-file-pen text-yellow-400 cursor-pointer hover:text-yellow-600"></i>
            <i title="complete" className="fa-solid fa-circle-check text-green-400 cursor-pointer hover:text-green-600"></i>
            <i title="delete" onClick={deleteHandler}className="fa-solid fa-trash text-red-400 cursor-pointer hover:text-red-600"></i>
            </div>
        </article>  
    </>
)
}

export default Items