import { createContext,useReducer } from "react";
import userReducer from "../reducers/userReducer";
export const UserContext = createContext()
const UserContextProvider= ({ children })=>{
    const [auth,dispatch] = useReducer(userReducer,{
        isAuth:false
    })
    return (
        <UserContext.Provider value={{auth,dispatch}}>
            { children }
        </UserContext.Provider>
    )
}
export default UserContextProvider