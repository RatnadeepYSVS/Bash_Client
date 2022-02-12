import { useContext, useEffect } from 'react'
import Editor from "./components/Editor"
import { UserContext } from './contexts/userContext'
export default function Home() {
  const { auth,dispatch } = useContext(UserContext)
  useEffect(()=>{
    const token = localStorage.getItem("usertoken")
    if(token){
      dispatch({type:"LOGIN"})
    }
  },[])
  return (
    <div>
      <Editor/>
    </div>
  )
}
