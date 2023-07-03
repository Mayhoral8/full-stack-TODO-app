import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Contexts } from "./context/context";


const Navbar = () => {
  const auth = useContext(Contexts).auth

  


  return (
    <>
    <section className="bg-black text-white">
    <article className="grid-cols-2 grid h-12 mx-20 leading-10"> 
        <div className="">
        <h2>ToDo</h2>
        </div>
        <div className="">
        <ul className="grid grid-flow-col text-end">
        <li>Places</li>
          <Link to={'/login'}>
        {!auth.isLoggedIn && <li>Login</li>}
          </Link>
        {auth.isLoggedIn && <li>Add Place</li>}
        <Link to={'/signup'}>
        {!auth.isLoggedIn && <li>SignUp</li>}
        </Link>
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


