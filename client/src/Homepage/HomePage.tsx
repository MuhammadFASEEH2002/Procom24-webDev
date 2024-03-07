import {
  Button, Flex,
  VStack,
  Heading,
  Text, Stack, HStack, Image,

} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import ImageMockup from './components/Mockup'

import customer_bg from '../assets/customer_portal.png'
import phone from '../assets/phone.jpg'

import box2 from '../assets/box-2.png'
import box3 from '../assets/box-3.png'
import box4 from '../assets/box-4.png'

import back from '../assets/back.svg'
import rounded from '../assets/rounded.svg'

const Homepage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Stack m={4} justify={'center'} alignItems={'center'}  >
        <Heading fontSize={44} >The world at your fingertips</Heading>
      </Stack>
      <HStack
        backgroundImage={`url(${rounded})`}
        backgroundRepeat={'no-repeat'}
        direction={{ base: 'column', md: 'row' }} minH={'70vh'} justifyContent={'center'} >
        <HStack
          width={'45%'}
        >
          <ImageMockup img={customer_bg} url={'/customer'} />

        </HStack>
        <VStack

          width={'45%'}
        >
          <Heading color={'purple.400'} >Accepted globally</Heading>
          <Text lineHeight={10} fontSize={22} textAlign={'center'} mt={2}>Your Visa debit card is accepted at millions of retail and online merchants worldwide.</Text>
        </VStack>


      </HStack>
      <HStack
        backgroundImage={`url(${back})`}
        backgroundRepeat={'no-repeat'}
        direction={{ base: 'column', md: 'row' }} minH={'70vh'} justifyContent={'center'} >

        <VStack

          width={'75%'}
        >
          <Heading color={'purple.400'}
          >Free means free</Heading>
          <Text lineHeight={10} fontSize={22} textAlign={'center'} mt={2}>
            No hidden charges, no annual fees and no SMS surcharge.</Text>
        </VStack>
        <HStack
          width={'25%'}

        >
          <Image src={phone} />

        </HStack>

      </HStack>

      <Stack my={10} justify={'center'} alignItems={'center'}  >
        <Heading fontSize={44} >Free And Easy Signup</Heading>
      </Stack>
      <HStack justifyContent={'space-evenly'} h={'50vh'}>
        <Stack justify={'center'} alignItems={'center'} >
          <Image src={box2} width={40}></Image>
          <Text fontWeight={'semibold'} fontSize={22} >SignUp in Few Easy Steps</Text>
        </Stack>
        <Stack justify={'center'} alignItems={'center'} >
          <Image src={box3} width={40}></Image>
          <Text fontWeight={'semibold'} fontSize={22} >Our Team Will Verify Your Wallet in few hours</Text>
        </Stack>
        <Stack justify={'center'} alignItems={'center'} >
          <Image src={box4} width={40}></Image>
          <Text fontWeight={'semibold'} fontSize={22} >Secure Your Account</Text>
        </Stack>
      </HStack>

      <Stack my={10} justifyContent={'center'} alignItems={'center'} minH={'40vh'}>
        <Image src={'https://img.nayapay.com/images/personal-assets/call.png'} width={70} height={70} />
        <Stack alignItems={'center'}>
          <Heading>24/7 Customer Support</Heading>
          <Text>Talk to a real person, Our Help Line No +0392085</Text>
        </Stack>
      </Stack>


      <Footer />
    </>
  )
}


export default Homepage