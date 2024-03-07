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
      {/* footer */}
      <Footer />
    </>
  )
}


export default Homepage