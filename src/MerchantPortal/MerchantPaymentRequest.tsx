import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import { Card, CardBody, Text, FormControl, FormLabel, Input, FormHelperText, Stack, HStack, Button, useToast } from '@chakra-ui/react'
import api from '../utils/api'

const MerchantPaymentRequest = () => {
  const [loading, setLoading] = useState(false)
  const [fetch, setFetch] = useState(false)
  const [customerUsername, setCustomerUsername] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerAccountNumber, setCustomerAccountNumber] = useState("")
  const [merchantAccountNumber, setMerchantAccountNumber] = useState("")
  const [amount, setAmount] = useState("")
  const [bankname, setBankName] = useState("")
  const [purpose, setPurpose] = useState("")
  const toast=useToast()

  type CustomerData={
    _id: Object,
    name: string,
    username: string,
    email: string,
    bankname: string,
    accountnumber: string,
    password: string,
    phonenumber: string
  }
  type MerchantData={
    accountnumber: string,
  
  }
  const handleInputChange = (event: any, setState: any) => {
    setState(event.target.value);
  };
  async function getData(){
    try {
      if(customerUsername){
        const response = await api.post('/api/merchant/get-customer-data', { customerUsername})
        if(response.data.status){
          const { customerData } = response.data;
          const { merchantData } = response.data;
          setCustomerEmail(customerData.email);
          setMerchantAccountNumber(merchantData.accountnumber);
          setCustomerAccountNumber(customerData.accountnumber);
          setBankName(customerData.bankname);
          setFetch(true)
        } else{
          toast({
            title: "Invalid Username",
            status: "error",
            position: "top",
            duration: 5000,
            isClosable: true
          })
        }
      }
      else{
        toast({
          title: "Empty Username Field",
          status: "error",
          position: "top",
          duration: 5000,
          isClosable: true
        })
      }
    } catch (error) {
      
    }
  }
  async function reqPayment(){
    try {
      if(amount && purpose){}
    } catch (error) {
      
    }
  }
  return (
    <>
      {/* @ts-ignore */}
      <Sidebar >
        {loading ? (<></>) : (<>
          <Stack alignItems={"center"} justifyContent={"center"}>
            <Card width={"80%"}>
              <CardBody>
                <FormControl >
                  {fetch ?(<>
                    <Stack width={"45%"} mb={5}>
                    <FormLabel>Customer Email</FormLabel>
                    <Input type='email' placeholder='Enter Customer Email' readOnly  value={customerEmail}/>

                  </Stack>
                  <HStack justifyContent={"flex-start"} mb={5}>
                    <Stack width={"45%"} mr={5}>
                      <FormLabel>Merchant Account Number</FormLabel>
                      <Input type='email' placeholder='Merchant Account Number' readOnly  value={merchantAccountNumber}/>
                    </Stack>

                    <Stack width={"45%"}>
                      <FormLabel>Customer Account Number</FormLabel>
                      <Input type='email' placeholder='Merchant Account Number' readOnly value={customerAccountNumber} />
                    </Stack>
                  </HStack>
                  <Stack width={"45%"} mb={5}>
                    <FormLabel>Payment Amount</FormLabel>
                    <Input type='number' placeholder='Enter Amount in Rupees' />
                  </Stack>
                  <Stack width={"45%"} mb={5}>
                    <FormLabel>Customer Bank Name</FormLabel>
                    <Input type='text' readOnly value={bankname}/>
                  </Stack>

                  <Stack width={"45%"} mb={5}>
                    <FormLabel>Purpose of Payment</FormLabel>
                    <Input type='text' readOnly onChange={(event) => handleInputChange(event, setPurpose)}/>
                  </Stack>
                  <Button colorScheme='teal' >Request Payment</Button>

                  </>):(<>
                    <HStack mb={5} >
                    <Stack  width={"50%"}>
                      <FormLabel>Customer Username</FormLabel>
                      <HStack>
                        <Input type='text' placeholder='Enter Customer Username' onChange={(event) => handleInputChange(event, setCustomerUsername)}/>
                        <Button colorScheme='teal' onClick={()=>getData()}>Fetch</Button>
                      </HStack>
                    </Stack>
                  </HStack>
                  </>)}
             
              
                </FormControl>
              </CardBody>
            </Card>
          </Stack>
        </>)}
      </Sidebar>
    </>
  )
}

export default MerchantPaymentRequest