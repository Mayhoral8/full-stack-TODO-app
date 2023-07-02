import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Contexts } from "./context/context";

// import { data } from "./data";
const Items = (props)=>{
    const {title, description, category, time, colour, id, itemData, itemDataLogic} = props
    const data =  useContext(Contexts).data
   
    const {updateItem, setUpdateItem} = useContext(Contexts).data
    // let {itemData} = props
    const navigate = useNavigate()

    // console.log(props)
    const editHandler = ()=>{

        navigate('/newPlace')
    }

    const deleteHandler = ()=>{
console.log(itemDataLogic)
        let newData = itemData.filter((item)=>{      
              return item.id !== id
        })

        itemDataLogic(()=>{
            return newData
        })
        console.log(newData)
    }
 const updateHandler = ()=>{
        setUpdateItem(()=>{

          return(       
              {
                  title, 
                  description, 
                  time, 
                  category 
                }
                ) 
        })
        return navigate(`/updatePlace/${id}`)
      
    const place = itemData.find((item)=>{
        return item.id === id
    })
 }
return(
    <>
        <article className={`${colour ? colour: 'bg-gradient-to-r from-gray-900 to-gray-800'} overflow-hidden text-white drop-shadow-lg grid py-4 px-4 grid-rows-4 border-blue-300 h-56 gap-y-12 rounded-lg`}>
            <div className=" grid grid-cols-2">
        <div className="TEXTS grid   w-56">
        <h1 className="text-l font-bold">{title}</h1>
        </div>
        <div className="ml-auto ">
            <img src="" className="rounded-full h-12 w-12">
            </img>
        </div>
            </div>
        <div className="">
            <p className="text-xs mt-2">{description}</p>
        </div>
            <div className="DATE ">
            <h6 className="">{time}</h6>
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