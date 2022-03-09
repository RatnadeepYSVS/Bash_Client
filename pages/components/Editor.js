import {  useState } from "react"
import Editor from "@monaco-editor/react";
import { 
    useColorMode,
    Heading,
    Flex,
    Box,
    Spacer,
    Menu, 
    MenuButton, 
    Button, 
    MenuList, 
    MenuOptionGroup, 
    MenuItemOption,
    Textarea,
    FormControl,
    FormLabel,
    Spinner,
    useToast 
}
from "@chakra-ui/react";
import styles from "../../styles/Home.module.css"
import axios from "axios"
import copy from "copy-to-clipboard";
import Router from "next/router";
const Codeditor=({ viewLanguage,viewCode,viewInput,viewOutput,uniqid })=>{
    const languagesEditor={
        "C":'c',
        "C++":'cpp',
        "C#":"csharp",
        "Java":"java",
        "Kotlin":"kotlin",
        "Go":"go",
        "Python":"python",
        "JavaScript":"javascript",
        "Swift":"swift",
        "Ruby":"ruby"
    }
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
    const defaultValues={
        "C":'#include <stdio.h>\nint main(void) {\n\t// Your code goes here\n\tprintf("hello world");\n\treturn 0;\n}\n',
        "C++":'#include <bits/stdc++.h>\n' +
        'using namespace std;\n' +
        'int main() {\n' +
        '\t// Your code goes here\n' +
        '    cout<<"hello world";\n' +
        '\treturn 0;\n' +
        '}',
        "C#":'using System;\n' +
        'namespace HelloWorldApp {\n' +
        '\tclass Bash {\n' +
        '\t\tstatic void Main(string[] args) {\n' +
        '            //Your code goes here\n' +
        '\t\t\tConsole.WriteLine("Hello World!");\n' +
        '\t\t\tConsole.ReadKey();\n' +
        '\t\t}\n' +
        '\t}\n' +
        '}\n',
        "Java":'import java.util.*;\n' +
        'import java.lang.*;\n' +
        'import java.io.*;\n' +
        'class Bash\n' +
        '{\n' +
        '\tpublic static void main (String[] args) throws java.lang.Exception\n' +
        '\t{\n' +
        '\t\t// Your code goes here\n' +
        '        System.out.println("Hello Java");\n' +
        '\t}\n' +
        '}',
        "Kotlin":'fun main(args : Array<String>) {\n' +
        '    // Your code goes here\n' +
        '    println("Hello, World!")\n' +
        '}\n',
        "Go":'package main\n' +
        'import "fmt"\n' +
        'func main() {\n' +
        '    fmt.Println("Hello World")\n' +
        '}\n',
        "Swift":'// Your code goes here\nprint("Hey there Apple Developer!!!!")\n',
        "Python":'# Your code goes here\nprint("Python is the boss")',
        "JavaScript":"// Your code goes here\nconsole.log('JavaScript is new cool')",
        "Ruby":'# Your code goes here\nputs "Show power of ruby script"'
    }
    function handleEditorChange(value) {
        setCode(value)
    }
    const [lang,setLang]=useState(viewLanguage?viewLanguage:'C')
    const [temp,setTemp]=useState(viewLanguage?viewCode:defaultValues["C"])
    const [input,setInput]=useState(viewInput?viewInput:'')
    const [output,setOutput]=useState(viewOutput?viewOutput:'code output')
    const [editorLang,setEditorLang]=useState(viewLanguage?languagesEditor[viewLanguage]:languagesEditor["C"])
    const [code,setCode]=useState(viewCode?viewCode:defaultValues["C"])
    const [link,setLink]=useState('link')
    const [save,setSave]=useState('save')
    const { colorMode }=useColorMode()
    const languages=['C','C++',"C#","Java","Kotlin","Go","Python","JavaScript","Ruby","Swift"]
    const toast = useToast()
    return  (
        <div className={styles.paddingclass}>
            <Flex mt='-10'>
            <Box p='4'>
                <Heading style={{fontFamily:"inherit"}}>
                    IDE
                </Heading>
            </Box>
            <Spacer />
            <Box p='4' ml='-10'>
            <Menu closeOnSelect={false}>
                <MenuButton
                ml='2' 
                as={Button}
                color={colorMode=='dark'?"white":"black"}
                >
                    {lang}
                </MenuButton>
                <MenuList
                width="100px"
                >
                    <MenuOptionGroup
                    defaultValue={lang}
                    type='radio'
                    >
                    {languages.map((language,i)=>(
                        <MenuItemOption
                        value={languagesEditor[language]}
                        key={i}
                        onClick={
                            ()=>{
                                setLang(language)
                                setTemp(defaultValues[language])
                                setEditorLang(languagesEditor[language])
                                setCode(defaultValues[language])
                                setOutput('code output')
                            }
                        }
                        >
                        {language}
                        </MenuItemOption>
                    ))}
                    </MenuOptionGroup>
                </MenuList>
            </Menu>
            </Box>
            </Flex>
            <Flex>
                <Box>
                <Editor
                language={editorLang}
                width='70vw'
                height='80vh'
                theme={colorMode=='dark'?"vs-dark":"light"}
                value={temp}
                onChange={handleEditorChange}
                />
                </Box>
                    <Box ml='20' mt='10'>
                    <Button style={{display:"block",width:"150px",height:"60px",
                    borderRadius:"30px",textAlign:"center"}} mb='100'
                    onClick={()=>{
                        const token = localStorage.getItem("usertoken")
                        if(!token){
                            toast({
                              title:"Login to save code",
                              status:"error",
                              isClosable:false,
                              position:"top-right",
                              duration:3000,
                              isClosable:true  
                            })
                            return 
                        }
                        setSave('Saving')
                        const language=languagesApi[lang]
                        const data = {
                            code,
                            language,
                            input
                        }
                        axios.post(`savecode`,data,{
                            headers:{
                                "Authorization":token
                            }
                        }).then(resp=>{
                            setSave('Saved Code')
                            const { msg } = resp.data
                            toast({
                                title:msg,
                                status:'success',
                                position:'top-right',
                                isClosable:true,
                                duration:3000
                            })
                        }).catch(e=>{
                            setSave('Error')
                        })
                    }}
                    >{
                        save=='Saving'?<Spinner/>:"Save"
                    }</Button>
                    <Button style={{display:"block",width:"150px",height:"60px",
                    borderRadius:"30px",textAlign:"center"}} mb='100'
                    onClick={()=>{ 
                        const language=languagesApi[lang]
                        const data = {
                            code,
                            language,
                            input
                        }
                        setLink('generating')
                        axios.post(`sharecode`,data).then(
                            resp=>{
                                setLink('Link generated')
                                uniqid?copy(`${window.location.href}`):copy(`${window.location.href}viewcode/${resp.data.codeData._id}`)
                                toast({
                                    title:"Link Copied To Clipboard",
                                    status:"success",
                                    isClosable:true,
                                    duration:3000,
                                    position:"top-right"
                                })
                                setLink('generated link')
                            }
                        ).catch(e=>{
                            toast({
                                title:"Oopsy!Looks like server is busy try again....",
                                status:"error",
                                isClosable:true,
                                duration:3000,
                                position:"top-right"
                            })  
                            setLink('error')
                        })
                    }}
                    >
                    {link=='generating'?<Spinner />:"Share"} 
                    </Button>
                    <Button style={{display:"block",width:"150px",height:"60px",
                    borderRadius:"30px",textAlign:"center"}} mb='100'
                     onClick={async()=>{
                        setOutput('')
                        const language=languagesApi[lang]
                        const data = {
                            code,
                            language,
                            input
                        }
                        if(uniqid){
                            const resp = await axios.put(`updatecode/${uniqid}`,data)
                            setOutput(resp.data.output)
                            return Router.push(`${window.location.href}/#output`)
                        }
                        Router.push("/#output")
                        const resp=await axios.post(`runcode`,data)
                        setOutput(resp.data.output)
                     }}
                     >Run</Button>
                </Box>
            </Flex>
            <form>
            <FormControl mt={6}>
                <FormLabel>Input</FormLabel>
                <Textarea
                placeholder="Give your input here..."
                size="md"
                w='900px'
                h='150px'
                value={input}
                onChange={event => setInput(event.target.value)}
                />
            </FormControl>
            <FormControl mt={6}>
            <FormLabel>Output
            </FormLabel>
            {
                output?<Textarea
                placeholder="Output....."
                size="md"
                w='900px'
                h='150px'
                isReadOnly={true}
                value={output}
                id="output"
                />:<Spinner style={{display:"block"}} ml='40vw' size='xl' id="output"/>
            }
            </FormControl>
    </form>
        </div>
  )
}
export default Codeditor
