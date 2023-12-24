import React, { useEffect } from 'react'
// import as const home_image = require('./resources/home_image.png')
import { Link } from 'react-router-dom';


const Home = () => {


  return (
    <React.Fragment>
      <div className='flex flex-col-reverse mt-20 h-full'>
        <div>
          <h2 className='text-center font-bold'>Get started</h2>
          <div className='grid grid-cols-2 mx-auto gap-x-2 justify-start mt-5' data-aos="fade-zoom-in"
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
        <div data-aos="fade-right"
          data-aos-easing="ease-out"
          data-aos-duration="1200">

          <img src={require('./resources/home_image.png')} className='text-center mx-auto w-96 h-64'></img>
        </div>
      </div>
    </React.Fragment>
  )
}
export default Home