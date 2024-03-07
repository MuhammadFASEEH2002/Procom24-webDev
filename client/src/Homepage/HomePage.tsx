import {
  Button, Flex,
  Container,
  Heading,
  Text,
  Icon,
  IconProps,Stack, Image
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Navbar from './components/Navbar'

const Homepage = () => {
  return (
    <>
      <Navbar></Navbar>
      <Container maxW={'5xl'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Business Payments{' '}
            <Text as={'span'} color={'purple.400'}>
              Made Easy
            </Text>
          </Heading>
          <Text color={'gray.500'} maxW={'xl'}>
         PayEaze makes it easier for merchants and customers to make their payments in one go. Sign up today and explore.
          </Text>
          <Stack spacing={6} direction={'row'}>
          <Link to={"/customer/login"}>
          <Button rounded={'full'} px={6} bg={"purple.300"}   _hover={{ bg: 'purple.500' }} color={"white"}>
              Customer
            </Button>
            </Link>
            <Link to={"/merchant/login"}>
            <Button rounded={'full'} px={6} bg={"purple.500"}   _hover={{ bg: 'purple.600' }} color={"white"}>
              Merchant
            </Button>
            </Link>
          </Stack>
          <Flex w={'full'} alignItems={"center"} justifyContent={"center"} >
            {/* <Illustration height={{ sm: '24rem', lg: '28rem' }} mt={{ base: 12, sm: 16 }} /> */}
            <Image src='../../src/assets/card_animation.gif' boxSize={"300px"}></Image>
          </Flex>
        </Stack>
      </Container>

    </>
  )
}

export default Homepage