import { useState,useEffect, useContext } from "react"
import axios from "axios"
import Router from "next/router"
import {
    Heading,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Link,
    Button,
} from '@chakra-ui/react'
import { UserContext } from "./contexts/userContext"
export default function Savedcodes(){
    const languagesApi={
        "C":'c',
        "C++":'cpp',
        "Java":"java",
        "C#":"cs",
        "Kotlin":"kt",
        "Go":"go",
        "Python":"py",
        "JavaScript":"js",
        "Ruby":"rb",
        "Swift":"swift"
    }
    const [userCodes,setUserCodes] = useState([])
    const codeFactors=["S.No",'Language','Code','CreatedAt','UpdatedAt']
    const { auth } = useContext(UserContext)
    const { isAuth } = auth
    useEffect(()=>{
        const token = localStorage.getItem("usertoken")
        if(!token) return
        axios.get(`yourcodes`,{
            headers:{
                "Authorization":token
            }
        }).then(({ data })=>{
            setUserCodes(data.codes)
        }).catch(e=>{
            console.log(e.response.data)
        })
    },[])
    return isAuth?(
        <div style={{padding:"0px 70px"}}>
            <Heading textAlign="center">
                Your codes
            </Heading>
            <div style={{marginTop:"10px",padding:"10px"}}>
                {
                    userCodes.length>0?<Table variant='simple'>
                    <TableCaption>Saved Codes</TableCaption>
                    <Thead>
                    <Tr>
                    {
                        codeFactors.map((val,ind)=>(
                        <Th key={ind}>
                            {val}
                        </Th>
                        ))
                    }
                    </Tr>
                    </Thead>
                    <Tbody>
                    {
                        userCodes.reverse().map((val,index)=>(
                            <Tr key={index}>
                                <Td>{index+1}.</Td>
                                <Td>{
                                    Object.keys(languagesApi).find(i=>languagesApi[i]==val.language)
                                }</Td>
                                <Td>
                                <Link href={`https://bash-ide.vercel.app/viewcode/${val._id}`}>
                                    Viewcode
                                </Link>
                                </Td>
                                <Td>{JSON.stringify(new Date(val.createdAt).toString()).slice(1,11)}</Td>
                                <Td>{JSON.stringify(new Date(val.updatedAt).toString()).slice(1,11)}</Td>
                            </Tr>
                        ))
                    }
                    </Tbody>
                    <Tfoot>
                    <Tr>
                    {
                        codeFactors.map((val,ind)=>(
                        <Th key={ind}>
                            {val}
                        </Th>
                        ))
                    }
                    </Tr>
                    </Tfoot>
                   </Table>:<Heading textAlign="center">You are not having any saved Codes.</Heading>
                }
           </div>
        </div>
    ):(
        <div>
        <Heading mt='20' textAlign="center">Login to see your saved codes.</Heading>
        <Button 
         display="block"
         margin="20px auto"
         width="150px"
         bgColor="tomato"
         onClick={()=>{
           Router.push("/login")  
         }}
        >
            Login
        </Button>
        </div>
    )
}