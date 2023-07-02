import React, {useState} from "react";
import { createContext } from "react";


export const Contexts = createContext({isLoggedIn: false, login: ()=>{}, logout: ()=>{}})
// const Context = ()=>{
//     const [isLoggedIn, setIsLoggedIn] = useState(false)
//     const login = ()=>{
//         setIsLoggedIn(true)
//     }
//     const logout = ()=>{
//         setIsLoggedIn(false)
//     }
//     return(<>

//     <context.Provider>

//     </context.Provider>
//     </>)

// }
// export default Context