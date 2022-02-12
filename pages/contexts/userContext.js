import { createContext,useReducer } from "react";
export const UserContext = createContext()
const userReducer=(state,{ type })=>{
    switch(type){
        case "LOGIN":
            return {
                isAuth:true
            }
        case "LOGOUT":
            return {
                isAuth:false
            }
        default:
            return state
    }
}
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