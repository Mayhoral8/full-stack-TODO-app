import React, {useEffect} from 'react'
import home_image from './resources/home_image.png'
import Aos from "aos";
import { Link } from 'react-router-dom';


 const Home = ()=> {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <React.Fragment>
      <div className='flex flex-col-reverse mt-20 h-full'>
      <div>
        <h2 className='text-center font-bold'>Get started</h2>
        <div className='grid grid-cols-2 mx-auto gap-x-2 justify-start mt-5'  data-aos="fade-zoom-in"
                  data-aos-easing="ease-out"
                  data-aos-duration="1200">
                    <div className='ml-auto'>

          <Link to={'/login'}>
        <button className=' h-10 w-20 rounded-lg text-yellow-500 border-2 border-gray-200 text-sm  block'>Login</button>
          </Link>
                    </div>
                    <div>

          <Link to={'/signup'}>
        <button className=' h-10 w-20 rounded-lg bg-yellow-400 text-sm'>Signup</button>
          </Link>
                    </div>
        </div>
      </div>
      <div  data-aos="fade-right"
                  data-aos-easing="ease-out"
                  data-aos-duration="1200">

   <img  src={home_image} className='text-center mx-auto w-96 h-64'></img>
      </div>
      </div>
    </React.Fragment>
  )
}
export default Home