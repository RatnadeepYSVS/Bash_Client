import { useEffect, useState } from "react"
import {
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast
} from '@chakra-ui/react';
import axios from "axios";
import Router from "next/router"
export default function Login(){
    useEffect(()=>{
        const token = localStorage.getItem("usertoken")
        if(token){
            return Router.push("/")
        }
    })
    const [username,setUsername]=useState('')
    const [login,setLogin]=useState(true)
    const [email,setEmail]=useState('')
    const [passcode,setPasscode]=useState('')
    const toast = useToast()
    const toggleBetween =()=>{
        setLogin(!login)
        setEmail('')
        setPasscode('')
    }
    const onSignup=e=>{
        e.preventDefault()
        if(!username || !email || !passcode){
            return toast({
                title:"Enter Fields",
                position:"top-right",
                status:"error",
                duration:5000,
                isClosable:true
            })
        }
        const emailReg = /\S+@\S+\.\S+/;
        const validEmail = emailReg.test(email)
        if(!validEmail){
            return toast({
                title:"Invalid Email",
                position:"top-right",
                status:"error",
                duration:5000,
                isClosable:true
            })
        }
        const data = {
            username,
            email,
            password:passcode
        }
        axios.post(`signup`,data).then(res=>{
            const { token }=res.data
            localStorage.setItem("usertoken",token)
            window.location.replace("/")
        }).catch(e=>{
            const { msg }=e.response.data
            toast({
                title:msg,
                duration:3000,
                isClosable:true,
                position:"top-right",
                status:'error'
            })
        })
    }
    const onSigin=e=>{
        e.preventDefault()
        if(!email || !passcode){
            return toast({
                title:"Enter Fields",
                position:"top-right",
                status:"error",
                duration:3000,
                isClosable:true
            })
        }
        const data = {
            email,
            password:passcode
        }
        axios.post(`signin`,data).then(res=>{
            const { token } = res.data
            localStorage.setItem("usertoken",token)
            window.location.replace('/')
        }).catch(e=>{
            const { msg } = e.response.data
            toast({
                title:msg,
                duration:5000,
                status:'error',
                position:"top-right",
                isClosable:true
            })
        })
    }
    return login?(
        <div style={{maxWidth:"500px",display:"block",margin:"40px auto"}}>
        <Box p={12}  borderWidth={2} borderRadius={8} boxShadow="lg" className="addMarg">
          <Box textAlign="center">
            <Heading style={{fontFamily:"inherit"}}>Login</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} placeholder="test@test.com" onChange={(e)=>setEmail(e.target.value)} />
              </FormControl>
              <FormControl isRequired mt={4}>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={passcode} placeholder="*******" onChange={e=>setPasscode(e.target.value)} />
              </FormControl>
              <Button width="full" mt={4} type="submit" onClick={onSigin}>
                Sign In
              </Button>
            </form>
          </Box>
          <Box textAlign="center">
            Not having an Account?
            <Heading 
            style={{
                fontFamily:"inherit",
                fontSize:'20px',
                cursor:"pointer",
                maxWidth:"70px",
                display:"block",
                margin:"auto"
            }}
            onClick={toggleBetween}
            >
                Signup
            </Heading>
          </Box>
        </Box>
      </div>
    ):<div style={{maxWidth:"500px",display:"block",margin:"40px auto"}}>
    <Box p={12}  borderWidth={2} borderRadius={8} boxShadow="lg" className="addMarg">
      <Box textAlign="center">
        <Heading style={{fontFamily:"inherit"}}>Signup</Heading>
      </Box>
      <Box my={4} textAlign="left">
        <form>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input type="text" value={username} placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} placeholder="test@test.com" onChange={(e)=>setEmail(e.target.value)} />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={passcode} placeholder="*******" onChange={e=>setPasscode(e.target.value)} />
          </FormControl>
          <Button width="full" mt={4} type="submit" onClick={onSignup}>
            Sign Up
          </Button>
        </form>
      </Box>
      <Box textAlign="center">
        Have An Account!
        <Heading 
        style={{
            fontFamily:"inherit",
            fontSize:'20px',
            cursor:"pointer",
            maxWidth:"70px",
            display:"block",
            margin:"auto"
        }}
        onClick={toggleBetween}
        >
            Login
        </Heading>
      </Box>
    </Box>
  </div>
}