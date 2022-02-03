import { 
  ChakraProvider,
  CSSReset,
  extendTheme
} from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/react'
import '../styles/globals.css'
import Navbar from './components/Navbar'
import Head from 'next/head'
import axios from 'axios'
axios.defaults.baseURL='https://bashserver.herokuapp.com/'
axios.defaults.withCredentials=true
function MyApp({ Component, pageProps }) {
  const config = {
    initialColorMode: "dark",
    useSystemColorMode: true,
  }
  const theme = extendTheme({ config })
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
      <CSSReset/>
      <Head>
        <title>Bash_IDE</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/icon.png" />
      </Head> 
      <Navbar/>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
export default MyApp