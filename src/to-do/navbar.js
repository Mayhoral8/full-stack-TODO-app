import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Contexts } from "./context/context";


const Navbar = () => {
  
  const auth = useContext(Contexts).auth
  const modal = useContext(Contexts).modal
  const { setLogoutModal, setModalShow, setModalMsg } = modal
  const { show, setShow } = useContext(Contexts).logoutContext

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
      <section className={`bg-gray-900 text-white w-full z-30 fixed h-12 top-0`}>
        <article className={`lg:grid-cols-2 lg:grid  lg:h-12 lg:mx-32 leading-10 `}>
          <div className={`  px-5 grid grid-cols-2`}>
            <div >
              <NavLink to='/'>
                <h2 onClick={() => { showHandler('home'); auth.logout('home') }} className='text-yellow-400'>ToDo</h2>
              </NavLink>
            </div>
            <div className="text-end">
              {show ? <i onClick={showHandler} className={`fa-solid fa-xmark text-xl cursor-pointer text-yellow-400 lg:hidden`} /> : <i className="lg:hidden fa-solid fa-bars cursor-pointer text-yellow-400" onClick={showHandler} />}
            </div>
          </div>
          <div className="">
            <article className={`${show ? 'mt-2 border-t lg:border-none lg:h-0 md:h-0 md:block lg:block h-screen  sticky text-center  lg:text-base text-2xl  bg-gray-900 ' : ' hidden lg:block h-0'}  transition-all ease-in ease-out delay-400`}>
              <div className=" h-full">
                <ul className={`${show ? 'grid-flow-row gap-y-10' : 'h-0'} pt-44 lg:pt-0 text-white grid lg:grid-flow-col lg:text-end `}>
                  {!auth.token ?
                    <li> <NavLink to='/login' className={`${show ? 'visible lg:block' : 'hidden lg:block'} text-yellow-400`} onClick={showHandler}>
                      Login
                    </NavLink> </li> : null}

                  {auth.token ?

                    <li className={`${show ? 'visible' : 'hidden lg:block'} cursor-pointer text-yellow-400`} onClick={()=> {logoutModalHandler(); showHandler()}}>logout
                    </li>
                    : null}

                  {auth.token ?
                    <li><NavLink to='/newPlace' className={`${show ? 'visible' : 'hidden lg:block'} text-yellow-400 cursor-pointer`} onClick={showHandler}>Add new Place</NavLink></li> : null

                  }

                  {!auth.token ?
                    <li> <NavLink to='/signup' className={`${show ? 'visible' : 'hidden lg:block'} text-yellow-400 cursor-pointer`} onClick={showHandler}> SignUp</NavLink></li> : null}

                </ul>
              </div>
            </article>
          </div>
        </article>
      </section>
    </>
  )
}
export default Navbar;




