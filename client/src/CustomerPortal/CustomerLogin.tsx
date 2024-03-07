import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  useToast,
  Spinner
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import api from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import RoutesPath from '../utils/routes';
import graph from '../assets/graph.png'


const CustomerLogin = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast()
  const navigate = useNavigate()
  const [cookies] = useCookies();

  const handleInputChange = (event: any, setState: any) => {
    setState(event.target.value);
  };

  async function checkToken() {
    const customerToken = cookies.customerToken;
    // const customerToken = cookies.customerToken;

    if (customerToken) {
      navigate(RoutesPath.CUSTOMER_PAYMENTS);
    }
  }
  useEffect(() => {
    checkToken()
  }, []);
  async function customerLogin() {
    try {
      setLoading(true);


      // console.log(role, email, password)
      if (username && password) {
        const response = await api.post('/api/customer/login', { username, password })
        // console.log(response.data);
        if (response.data.status) {
          toast({
            title: "User Logged In",
            status: "success",
            position: "top",
            duration: 5000,
            isClosable: true
          })
          navigate(RoutesPath.CUSTOMER_PAYMENTS)
        } else {
          toast({
            title: "Auth Error",
            description: response.data.message,
            status: "error",
            position: "top",
            duration: 5000,
            isClosable: true
          })
          setLoading(false);
        }
      } else {
        toast({
          title: "Empty Fields",
          status: "error",
          position: "top",
          duration: 5000,
          isClosable: true
        })
        setLoading(false);
      }
    } catch (error) {
      toast({
        title: "Network Error",

        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true
      })
      navigate(RoutesPath.HOME)
    }
  }

  return (
    <>
      {loading ? (<>
        <Stack minHeight={'100%'} width={'100%'} alignItems={"center"} justifyContent={"center"} ><Spinner size='xl' /></Stack>
      </>) : (<>

        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
          <Flex p={8} flex={1} align={'center'} justify={'center'}>
            <Stack spacing={4} w={'full'} maxW={'md'}>
              <Heading fontSize={'2xl'}>Sign in to your <Text color={'purple.400'} fontSize={28} fontFamily={'sans-serif'} >Customer Account</Text> </Heading>
              <FormControl id="email">
                <FormLabel>Username</FormLabel>
                <Input type="email" onChange={(event) => handleInputChange(event, setUsername)}
                  onKeyPress={event => {
                    if (event.key === 'Enter') {
                      customerLogin()
                    }
                  }}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" onChange={(event) => handleInputChange(event, setPassword)}

                  onKeyPress={event => {
                    if (event.key === 'Enter') {
                      customerLogin()
                    }
                  }}
                />
              </FormControl>
              <Stack spacing={6} textAlign={'center'}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Text color={'blue.500'}>Forgot password?</Text>
                </Stack>
                <Button colorScheme={'purple'} variant={'solid'} onClick={() => { customerLogin() }}>
                  Sign in
                </Button>
                <Link to={RoutesPath.CUSTOMER_REGISTER}  >
                  <Text textDecor={'underline'} >Dont Have An Account? Create One</Text>
                </Link>
              </Stack>
            </Stack>
          </Flex>
          <Flex flex={1} flexDirection={'column'} bg={'purple.400'} justifyContent={'center'} alignItems={'center'} >
            <Text color={'white'} fontSize={32} fontFamily={'monospace'} fontWeight={'semibold'} mb={6} >Secure Payment</Text>
            <Stack w={'70%'} boxShadow={'md'} borderRadius={6} >
              <Image src={graph} borderRadius={6} />
            </Stack>
            <Text color={'white'} fontSize={28} fontWeight={'bold'} mt={6} >Monthly Report</Text>
          </Flex>
        </Stack>
      </>)}

    </>
  )
}

export default CustomerLogin