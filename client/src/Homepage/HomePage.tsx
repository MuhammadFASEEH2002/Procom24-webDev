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
      {/* <Link to={"/merchant/login"}>
    <Button>Merchant</Button>
    </Link>
    <Link to={"/customer/login"}>
    <Button>Customer</Button>
    </Link> */}
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
          <Text color={'gray.500'} maxW={'3xl'}>
            Never miss a meeting. Never be late for one too. Keep track of your meetings and
            receive smart reminders in appropriate times. Read your smart “Daily Agenda”
            every morning.
          </Text>
          <Stack spacing={6} direction={'row'}>
          <Button rounded={'full'} px={6} bg={"purple.300"}   _hover={{ bg: 'purple.500' }} color={"white"}>
              Customer
            </Button>
            <Button rounded={'full'} px={6} bg={"purple.500"}   _hover={{ bg: 'purple.600' }} color={"white"}>
              Merchant
            </Button>
          </Stack>
          <Flex w={'full'}>
            {/* <Illustration height={{ sm: '24rem', lg: '28rem' }} mt={{ base: 12, sm: 16 }} /> */}
            <Image src='../../src/assets/ani'></Image>
          </Flex>
        </Stack>
      </Container>

    </>
  )
}

export default Homepage