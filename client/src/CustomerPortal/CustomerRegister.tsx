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
  import { Link, Routes, useNavigate } from 'react-router-dom';
  import { useCookies } from 'react-cookie';
  import RoutesPath from '../utils/routes';
  
  
  const CustomerRegister = () => {
    const [name, setName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email , setEmail] = useState<string>("");
    const [phoneNo , setPhoneNo] = useState<string>("");
    const [accountno , setAccountNo] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [bankname, setBankname] = useState<string>("");

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
        navigate(RoutesPath.CUSTOMER_DASHBOARD);
      }
    }
    useEffect(() => {
      checkToken()
    }, []);
    async function customerRegister() {
      try {
        setLoading(true);
  

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
    async function customerRegisteration() {
      try {
        setLoading(true);
  
  
        // console.log(role, email, password)
        if (username && password && email && phoneNo && accountno && name && bankname) {
          const response = await api.post('/api/customer/register', { name,username , password, email, phoneNo , accountno, bankname})
          // console.log(response.data);
          if (response.data.status) {
            toast({
              title: "Customer ID Created",
              status: "success",
              position: "top",
              duration: 5000,
              isClosable: true
            })
            navigate(RoutesPath.CUSTOMER_LOGIN)
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
                <Heading fontSize={'2xl'}>Register New Customer Account</Heading>
                <FormControl >
                  <FormLabel>Full Name</FormLabel>
                  <Input type="text" onChange={(event) => handleInputChange(event, setName)}
                    onKeyPress={event => {
                      if (event.key === 'Enter') {
                        customerRegister()
                      }
                    }}
                  />
                </FormControl>
                <FormControl >
                  <FormLabel>Username</FormLabel>
                  <Input type="text" onChange={(event) => handleInputChange(event, setUsername)}
                    onKeyPress={event => {
                      if (event.key === 'Enter') {
                        customerRegister()
                      }
                    }}
                  />
                </FormControl>
                <FormControl >
                  <FormLabel>Bank Name</FormLabel>
                  <Input type="text" onChange={(event) => handleInputChange(event, setBankname)}
                    onKeyPress={event => {
                      if (event.key === 'Enter') {
                        customerRegister()
                      }
                    }}
                  />
                </FormControl>
                <FormControl >
                  <FormLabel>Account No :</FormLabel>
                  <Input type="text" onChange={(event) => handleInputChange(event, setAccountNo)}
                    onKeyPress={event => {
                      if (event.key === 'Enter') {
                        customerRegister()
                      }
                    }}
                  />
                </FormControl>
                <FormControl >
                  <FormLabel>Email :</FormLabel>
                  <Input type="email" onChange={(event) => handleInputChange(event, setEmail)}
                    onKeyPress={event => {
                      if (event.key === 'Enter') {
                        customerRegister()
                      }
                    }}
                  />
                </FormControl>
                <FormControl >
                  <FormLabel>Phone No :</FormLabel>
                  <Input type="number" onChange={(event) => handleInputChange(event, setPhoneNo)}
                    onKeyPress={event => {
                      if (event.key === 'Enter') {
                        customerRegister()
                      }
                    }}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input type="password"  onChange={(event) => handleInputChange(event, setPassword)}
  
                    onKeyPress={event => {
                      if (event.key === 'Enter') {
                        customerRegister()
                      }
                    }}
                  />
                </FormControl>
                <Stack spacing={6} textAlign={'center'} >
                  <Button colorScheme={'blue'} variant={'solid'} onClick={()=>{customerRegisteration()}}>
                    Register
                  </Button>
                  <Link to={RoutesPath.CUSTOMER_LOGIN}>
                    <Text textDecor={'underline'} >Already have an account? Sign in</Text>
                    </Link>
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
        </>)}
  
      </>
    )
  }
  
  export default CustomerRegister