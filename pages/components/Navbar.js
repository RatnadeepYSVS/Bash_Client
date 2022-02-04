import { useEffect, useState } from "react"
import { Heading,Button,useColorMode,Flex,Box,Spacer } from '@chakra-ui/react'
import { MoonIcon,SunIcon } from "@chakra-ui/icons"
import Link from "next/link"
import Router from "next/router"
export default function Navbar(){
    const [user,setUser]=useState('')
    useEffect(()=>{
        const token = localStorage.getItem("usertoken")
        token?setUser(token):setUser('')
        window.location.reload()
    },[])
    const onHandleClick=()=>{
        if(!user){
           return Router.push("/login")
        }
        localStorage.removeItem("usertoken")
        setUser('')
        Router.push("/")
    }
    const { colorMode,toggleColorMode }=useColorMode()
    return(
        <div>
            <Flex>
            <Box p='4'>
                    <Heading style={{fontFamily:"inherit",cursor:"pointer"}} onClick={()=>{
                        return Router.push("/")                        
                    }}>
                    Bash Editor
                    </Heading>
            </Box>
            <Spacer />
            <Box p='4'>
                <Button onClick={()=>toggleColorMode()} style={{backgroundColor:"inherit",outline:false}} mr='5'>
                    {
                        colorMode==='dark'?<SunIcon/>:<MoonIcon/>
                    }
                </Button>
                <Link href="/savedcodes">
                    <a style={{fontWeight:"bold",padding:"10px",borderRadius:"10px"}}>Saved Codes</a>
                </Link>
                <Button ml='5' bgColor='tomato' onClick={onHandleClick}>
                    {
                        user?"Logout":"Login"
                    }
                </Button>
            </Box>
            </Flex>
        </div>
    )
}