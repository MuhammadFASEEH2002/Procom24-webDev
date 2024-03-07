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
<<<<<<< HEAD
      <Footer />
=======
      <Box
      // bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      bg={"purple.500"}
      >
        
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <Text color={"white"}>© {Date().split(" ")[3]} PayEaze. All rights reserved</Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton label={'Twitter'} href={'#'}>
            <FaTwitter />
          </SocialButton>
          <SocialButton label={'YouTube'} href={'#'}>
            <FaYoutube />
          </SocialButton>
          <SocialButton label={'Instagram'} href={'#'}>
            <FaInstagram />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
>>>>>>> d467f88b3ab01dd677a18a32124be2f4be0cd654
    </>
  )
}


export default Homepage