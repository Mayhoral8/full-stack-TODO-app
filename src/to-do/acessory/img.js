import React, {useContext} from 'react'
import { Contexts } from '../context/context'
import avatar from '../assets/avatar.jpg'



 const Img = ()=> {
const files = useContext(Contexts).files
const {profileImg} = files
  return (
    <div className='w-20 lg:ml-auto'>
    <img src={`${profileImg ? profileImg : avatar}`} alt='profile' className="border-yellow-400 rounded-full border-2 w-12 h-12 lg:mt-1 lg:ml-auto lg:block" />
    </div>
  )
}
export default Img