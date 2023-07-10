import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import { Contexts } from "./context/context";


const Navbar = () => {
  const auth = useContext(Contexts).auth

  


  return (
    <>
    <section className="bg-black text-white">
    <article className="grid-cols-2 grid h-12 mx-32 leading-10"> 
        <div className="">
            <NavLink to='/' exact>

        <h2>ToDo</h2>
            </NavLink>
          
        </div>
        <div className="">
        <ul className="grid grid-flow-col text-end">
        
          
        {!auth.isLoggedIn && <li> <NavLink to='/login'> 
          Login
          </NavLink> </li>}
       
          {auth.isLoggedIn &&
       
       <li onClick={auth.logout}> <NavLink to='/login'>logout
        </NavLink></li>
       }

       {auth.isLoggedIn &&
       <li><NavLink to='/newPlace'>Add new Place</NavLink></li>
      
       }
        
        {!auth.isLoggedIn && <li> <NavLink to='/signup'> SignUp</NavLink></li>}
       
    </ul>
        </div>
    </article>
    </section>
    </>
  )
}
export default Navbar;

 {/* <div className={`h-0 mt-4  lg:justify-end navbar-project lg:visible sticky transition-all ease-in delay-400 ${
                  false ? "h-0" : "h-48 lg:h-0"
                } bg-orange-100 w-full  top-0 z-20 absolute block`}>

                </div> */}


