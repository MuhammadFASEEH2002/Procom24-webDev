import {
  Button, Flex,
  Container,
  Heading,
  Text,Stack, Image,

} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'

const Homepage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Stack m={4} justify={'center'} alignItems={'center'} >
        <Heading fontSize={44} >The world at your fingertips</Heading>
      </Stack>
      <Footer />
    </>
  )
}


export default Homepage