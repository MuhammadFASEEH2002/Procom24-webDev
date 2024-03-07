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
  Spinner,
  Card
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import RoutesPath from '../utils/routes';

import ImageMockup from '../Homepage/components/Mockup';
import graph from '../assets/graph.png'

const MerchantLogin = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast()
  const navigate = useNavigate()
  const [cookies] = useCookies();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, setState: any) => {
    setState(event.target.value);
  };

  async function checkToken() {
    const merchantToken = cookies.merchantToken;
    // const customerToken = cookies.customerToken;

    if (merchantToken) {
      navigate(RoutesPath.MERCHANT_DASHBOARD);
    }
    else {
      // console.log("no token")
    }
  }

  useEffect(() => {
    checkToken()
  }, []);


  async function merchantLogin() {
    try {
      setLoading(true);
      // console.log(role, email, password)
      if (username && password) {
        const response = await api.post('/api/merchant/login', { username, password })
        // console.log(response.data);
        if (response.data.status) {
          toast({
            title: "User Logged In",
            status: "success",
            position: "top",
            duration: 5000,
            isClosable: true
          })
          navigate(RoutesPath.MERCHANT_DASHBOARD)
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
              <Heading fontSize={'2xl'}>Sign in to your Merchant Account</Heading>
              <FormControl id="email">
                <FormLabel>Username</FormLabel>
                <Input type="text" onChange={(event) => handleInputChange(event, setUsername)}
                   onKeyPress={event => {
                    if (event.key === 'Enter') {
                      merchantLogin()
                    }
                  }}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" onChange={(event) => handleInputChange(event, setPassword)}
                  onKeyPress={event => {
                    if (event.key === 'Enter') {
                      merchantLogin()
                    }
                  }}

                />
              </FormControl>
              <Stack spacing={6}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Text color={'blue.500'}>Forgot password?</Text>
                </Stack>
                <Button colorScheme={'purple'} variant={'solid'} onClick={() => { merchantLogin() }}>
                  Sign in
                </Button>
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

export default MerchantLogin