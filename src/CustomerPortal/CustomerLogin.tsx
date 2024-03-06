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
    useToast
  } from '@chakra-ui/react'
  import { useEffect, useState } from 'react';
  import api from '../utils/api';
  import { useNavigate } from 'react-router-dom';
  import { useCookies } from 'react-cookie';
  
  
  const CustomerLogin = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState(false);
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
          navigate('/customer/dashboard');
        }
          else {
          // console.log("no token")
        }
      }
      useEffect(() => {
        // Effect function
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
            navigate("/customer/dashboard")
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
        navigate('/')
      }
    }
  
    return (
      <>
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
          <Flex p={8} flex={1} align={'center'} justify={'center'}>
            <Stack spacing={4} w={'full'} maxW={'md'}>
              <Heading fontSize={'2xl'}>Sign in to your Customer Account</Heading>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={(event) => handleInputChange(event, setUsername)} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" onChange={(event) => handleInputChange(event, setPassword)} />
              </FormControl>
              <Stack spacing={6}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Text color={'blue.500'}>Forgot password?</Text>
                </Stack>
                <Button colorScheme={'blue'} variant={'solid'} onClick={() => { customerLogin() }}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Flex>
          <Flex flex={1}>
            <Image
              alt={'Login Image'}
              objectFit={'cover'}
              src={
                'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
              }
            />
          </Flex>
        </Stack>
  
      </>
    )
  }
  
  export default CustomerLogin