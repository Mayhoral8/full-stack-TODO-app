import React, {useEffect, useState, useContext} from 'react'
import Items from './items'
import { data } from './data'
import { VALIDATOR_MINLENGTH } from './validators'
import { useParams } from 'react-router-dom'
import { Contexts } from './context/context'

 const Main = ()=>{
//  const data = useContext(Contexts).data

 const userId = useParams().id
 const loadedItems = data.filter((item)=>{
    return item.creator === userId
})
    const [storedItems, setStoredItems] = useState(loadedItems)

    return<>
    <section className=" grid mx-24 mt-32 grid-cols-1 gap-y-6 gap-x-4 lg:grid-cols-3 min-h-fit">
    {storedItems.map((data, index)=>{
        console.log(index)
    return <Items key = {data.id} id={data.id} title = {data.title} description = {data.description} time = {data.date} category = {data.category} colour = {data.colour} itemData = {storedItems} itemDataLogic = {setStoredItems}/>
})}
  
    </section>
</> 
}
export default Main