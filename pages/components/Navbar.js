import { useContext } from "react"
import { Heading,Button,useColorMode,Flex,Box,Spacer } from '@chakra-ui/react'
import { MoonIcon,SunIcon } from "@chakra-ui/icons"
import Link from "next/link"
import Router from "next/router"
import { UserContext } from "../contexts/userContext"
export default function Navbar(){
    const { auth,dispatch } = useContext(UserContext)
    const { isAuth } = auth
    const onHandleClick=()=>{
        if(!isAuth){
         Router.push("/login")
        }
        localStorage.removeItem("usertoken")
        dispatch({ type:"LOGOUT" })
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
                        isAuth?"Logout":"Login"
                    }
                </Button>
            </Box>
            </Flex>
        </div>
    )
}