import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Contexts } from "./context/context.tsx";
import Img from "./acessory/img.js";



const Navbar = () => {
  const auth = useContext(Contexts).auth
  const modal = useContext(Contexts).modal
  const files = useContext(Contexts).files
  const { setLogoutModal, setModalShow, setModalMsg } = modal
  const { show, setShow } = useContext(Contexts).logoutContext


  const showHandler = (type:string) => {
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
        <article className={`${!auth.token ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} lg:grid lg:h-12 lg:mx-24 lg:my-auto leading-10`}>
          <div className={`px-5 grid grid-cols-3 lg:order-1 mt-1 lg:mt-0`}>
            <div className={`${auth.token? 'order-2' : null} my-auto`}>
              <NavLink to='/'>
                <h2 onClick={() => { showHandler('home'); auth.logout('home') }} className={`${auth.token ? 'text-center lg:text-start' : 'lg:text-center' } text-yellow-400`} >ToDo</h2>
              </NavLink>
            </div>
            <div className="text-end order-3 lg:order-2 my-auto">
              {show ? <i onClick={()=> showHandler('others')} className={`fa-solid fa-xmark text-2xl cursor-pointer text-yellow-400  lg:hidden`} /> : <i className="lg:hidden fa-solid fa-bars cursor-pointer text-2xl text-yellow-400" onClick={()=> showHandler('others')} />}
            </div>
            <div className="order-1 lg:order-3 my-auto">
          {auth.token ?
          <div className="lg:hidden"><Img/></div>

          : null}
          </div>
          </div>
          
            <article className={`${show ? 'mt-1 border-t lg:border-none lg:h-0 md:h-0 md:block lg:block h-screen  sticky  lg:text-base text-2xl  bg-gray-900 ' : ' hidden lg:block h-0'} lg:mt-3  lg:order-2 transition-all ease-in delay-400`}>
              <div className=" h-full lg:order-2">
                <ul className={`${show ? 'grid-flow-row gap-y-10' : 'h-0'} pt-44 lg:pt-0 text-white grid  lg:w-96 lg:grid-flow-col lg:text-end `}>
                  {!auth.token ?
                    <li> <NavLink to='/login' className={`${show ? 'visible lg:block ' : 'lg:text-start hidden lg:block'} text-yellow-400`} onClick={()=>showHandler('others')}>
                      Login
                    </NavLink> </li> : null}

                    {auth.token ?
                    <li><NavLink to='/newPlace' className={`${show ? 'visible' : 'hidden lg:block'} block text-center text-yellow-400 cursor-pointer`} onClick={()=> showHandler('others')}>Create new task</NavLink></li> : null
                  }

                  {auth.token ?
                    <li className={`${show ? 'visible' : 'hidden lg:block'} text-center cursor-pointer text-yellow-400 lg:text-end`} onClick={()=> {logoutModalHandler(); showHandler('other')}}>logout
                    </li>
                    : null}

                


                  {!auth.token ?
                    <li> <NavLink to='/signup' className={`${show ? 'visible' : 'hidden lg:block'} text-yellow-400 cursor-pointer`} onClick={()=> showHandler('others')}> SignUp</NavLink></li> : null}
                   
                
                </ul>
              </div>
            </article>
            {auth.token ?
              <div className={`hidden lg:block order-4 `}>
              <Img/>
              </div> : null}
          
        </article>
      </section>
    </>
  )
}
export default Navbar;




