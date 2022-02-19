import Codeditor from "../components/Editor"
import axios from "axios"
import { UserContext } from "../contexts/userContext"
import { useContext,useEffect } from "react"
export default function Code({ codeData,uniqid }){
    const { auth,dispatch } = useContext(UserContext)
    useEffect(()=>{
        const token = localStorage.getItem("usertoken")
        if(token){
        dispatch({type:"LOGIN"})
        }
    },[])
    const languagesApi={
        'c':"C",
        'cpp':"C++",
        "java":"Java",
        "cs":"C#",
        "kt":"Kotlin",
        "go":"Go",
        "py":"Python",
        "js":"JavaScript",
        "rb":"Ruby",
        "swift":"Swift"
    }
    return(
        <div>
            <Codeditor
            viewLanguage={languagesApi[codeData.language]}
            viewCode={codeData.code}
            viewInput={codeData.input}
            viewOutput={codeData.output}
            uniqid={uniqid}
            />
        </div>
    )
}
export const getServerSideProps=async(context)=>{
    const { id } = context.params
    const res = await axios.get(`viewcode/${id}`)
    const codeData = await res.data.code
    return {
        props:{
            codeData,
            uniqid:id
        }
    }
}
