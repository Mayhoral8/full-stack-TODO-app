import React, {useContext} from 'react'
import { Contexts } from '../context/context.tsx'
import avatar from '../assets/avatar.jpg'



 const Img = ()=> {
const files = useContext(Contexts).files
const { show, setShow } = useContext(Contexts).logoutContext
const {profileImg} = files
  return (
    <div className={`w-20 lg:ml-auto `}>
    <img src={`${profileImg ? profileImg : avatar}`} alt='profile' className={` block mx-auto border-yellow-400 w-12 h-12  rounded-full border-2  lg:mt-1 lg:ml-auto lg:block`}/>
    </div>
  )
}
export default Img