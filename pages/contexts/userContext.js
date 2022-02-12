import { createContext,useReducer } from "react";
import { userReducer } from "../reducers/userReducer";
export const UserContext = createContext()
export default ({ children })=>{
    const [auth,dispatch] = useReducer(userReducer,{
        isAuth:false
    })
    return (
        <UserContext.Provider value={{auth,dispatch}}>
            { children }
        </UserContext.Provider>
    )
}