import { 
  ChakraProvider,
  CSSReset,
  extendTheme,
  ColorModeScript
} from '@chakra-ui/react'
import '../styles/globals.css'
import Navbar from './components/Navbar'
import Head from 'next/head'
import axios from 'axios'
import UserContextProvider from './contexts/userContext'
axios.defaults.baseURL=process.env.NEXT_PUBLIC_API_BASE_URL
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
      <UserContextProvider>
        <Navbar/>
        <Component {...pageProps} />
      </UserContextProvider>
    </ChakraProvider>
  )
}
export default MyApp