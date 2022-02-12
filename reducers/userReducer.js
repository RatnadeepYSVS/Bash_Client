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
export default userReducer