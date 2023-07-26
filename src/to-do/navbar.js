import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Contexts } from "./context/context";
import Img from "./acessory/img";
import avatar from './assets/avatar.jpg'


const Navbar = () => {
  
  const auth = useContext(Contexts).auth
  const modal = useContext(Contexts).modal
  const files = useContext(Contexts).files
  const { setLogoutModal, setModalShow, setModalMsg } = modal
  const { show, setShow } = useContext(Contexts).logoutContext
  const {profileImg} = files

  const showHandler = (type) => {
    setShow(!show)
    if (type === 'home') {
      setShow(false)
    }

  }

  const logoutModalHandler = () => {
    setModalShow(true)
    setLogoutModal(true)
    setModalMsg('Are you sure you want to sign out?')
 
  }


  return (
    <>
      <section className={`bg-gray-900 text-white w-full z-30 fixed h-14 lg:pb-auto top-0`}>
        <article className={`lg:grid-cols-3 lg:grid  lg:h-12 lg:mx-24 lg:my-auto leading-10`}>
          <div className={`px-5 grid grid-cols-3 lg:order-1`}>
            <div className={`${auth.token? 'order-2' : null} my-auto`}>
              <NavLink to='/'>
                <h2 onClick={() => { showHandler('home'); auth.logout('home') }} className='text-yellow-400 text-center' >ToDo</h2>
              </NavLink>
            </div>
            <div className="text-end order-3 lg:order-2 my-auto">
              {show ? <i onClick={showHandler} className={`fa-solid fa-xmark text-2xl cursor-pointer text-yellow-400  lg:hidden`} /> : <i className="lg:hidden fa-solid fa-bars cursor-pointer text-2xl text-yellow-400" onClick={showHandler} />}
            </div>
            <div className="order-1 lg:order-3 my-auto">
          {auth.token ?
          <Img/>: null}
          </div>
          </div>
          
            <article className={`${show ? 'mt-1 border-t lg:border-none lg:h-0 md:h-0 md:block lg:block h-screen  sticky text-center  lg:text-base text-2xl  bg-gray-900 ' : ' hidden lg:block h-0'} lg:order-2 transition-all ease-in ease-out delay-400`}>
              <div className=" h-full lg:order-2">
                <ul className={`${show ? 'grid-flow-row gap-y-10' : 'h-0'} pt-44 lg:pt-0 text-white grid lg:col-span-2 lg:w-96 lg:grid-flow-col lg:text-end `}>
                  {!auth.token ?
                    <li> <NavLink to='/login' className={`${show ? 'visible lg:block ' : 'lg:text-start hidden lg:block'} text-yellow-400`} onClick={showHandler}>
                      Login
                    </NavLink> </li> : null}

                  {auth.token ?

                    <li className={`${show ? 'visible' : 'hidden lg:block'} cursor-pointer text-yellow-400 lg:text-start`} onClick={()=> {logoutModalHandler(); showHandler()}}>logout
                    </li>
                    : null}

                  {auth.token ?
                    <li><NavLink to='/newPlace' className={`${show ? 'visible' : 'hidden lg:block'} text-yellow-400 cursor-pointer`} onClick={showHandler}>Create new task</NavLink></li> : null

                  }

                  {!auth.token ?
                    <li> <NavLink to='/signup' className={`${show ? 'visible' : 'hidden lg:block'} text-yellow-400 cursor-pointer`} onClick={showHandler}> SignUp</NavLink></li> : null}
                </ul>
              </div>
         {/* <Img/> */}
            </article>
          
        </article>
      </section>
    </>
  )
}
export default Navbar;




