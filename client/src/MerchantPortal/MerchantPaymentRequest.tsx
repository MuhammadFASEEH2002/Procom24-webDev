import React, { useEffect, useRef, useState } from 'react'
import Sidebar from './components/Sidebar'
import { Card, CardBody, FormControl, FormLabel, Input, Stack, HStack, Button, useToast } from '@chakra-ui/react'
import api from '../utils/api'
import { CustomerDataType } from '../utils/types'
import QRCodeStyling from 'qr-code-styling'

import logo from '../assets/logo.png'

const MerchantPaymentRequest = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [fetch, setFetch] = useState<boolean>(false)
  const [customerUsername, setCustomerUsername] = useState<string>("")
  const [customerEmail, setCustomerEmail] = useState<string>("")
  const [customerAccountNumber, setCustomerAccountNumber] = useState<string>("")
  const [merchantAccountNumber, setMerchantAccountNumber] = useState<string>("")
  const [amount, setAmount] = useState("")
  const [bankname, setBankName] = useState<string>("")
  const [purpose, setPurpose] = useState<string>("")
  const [customerid, setCustomerid] = useState<Object>("")

  const toast = useToast()


  const qr = useRef()


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, setState: any) => {
    setState(event.target.value);
  };
  async function getData() {
    try {
      if (customerUsername) {
        const response = await api.post('/api/merchant/get-customer-data', { customerUsername })
        if (response.data.status) {
          const { customerData }: { customerData: CustomerDataType } = response.data;
          const { merchantData } = response.data;

          setCustomerEmail(customerData.email);
          setMerchantAccountNumber(merchantData.accountnumber);
          setCustomerAccountNumber(customerData.accountnumber);
          setBankName(customerData.bankname)
          setCustomerid(customerData._id)
          setFetch(true)
        } else {
          toast({
            title: "Invalid Username",
            status: "error",
            position: "top",
            duration: 5000,
            isClosable: true
          })
        }
      }
      else {
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
  async function reqPayment(customerId: any) {
    console.log(customerId)
    try {
      const { data } = await api.post('/api/merchant/payment-request', { merchantAccountNumber, customerAccountNumber, amount, purpose, customerId })
      console.log(data)

    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    const qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      data: 'Hello World',
      image: 'https://placehold.co/600x400/orange/white?text=PayEaze',
      dotsOptions: {
        color: '#ba55d3',
        type: 'square'
      },
      backgroundOptions: {
        color: 'transparent'
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 20
      }
    })
    if (qr.current) {
      //@ts-ignore
      console.log(qr.current.innerHTML = '')
    }
    qrCode.append(qr.current)

  }, [])

  return (
    <>
      <Sidebar active='Payment Request'  >
        {loading ? (<></>) : (<>
          <Stack alignItems={"center"} justifyContent={"center"}>
            <Card width={"80%"}>
              <CardBody>
                <FormControl >
                  {fetch ? (<>
                    <Stack width={"45%"} mb={5}>
                      <FormLabel>Customer Email</FormLabel>
                      <Input type='email' placeholder='Enter Customer Email' readOnly value={customerEmail} />

                    </Stack>
                    <HStack justifyContent={"flex-start"} mb={5}>
                      <Stack width={"45%"} mr={5}>
                        <FormLabel>Merchant Account Number</FormLabel>
                        <Input type='email' placeholder='Merchant Account Number' readOnly value={merchantAccountNumber} />
                      </Stack>

                      <Stack width={"45%"}>
                        <FormLabel>Customer Account Number</FormLabel>
                        <Input type='email' placeholder='Merchant Account Number' readOnly value={customerAccountNumber} />
                      </Stack>
                    </HStack>
                    <Stack width={"45%"} mb={5}>
                      <FormLabel>Payment Amount</FormLabel>
                      <Input type='number' placeholder='Enter Amount in Rupees' value={amount} onChange={(event) => handleInputChange(event, setAmount)} />
                    </Stack>
                    <Stack width={"45%"} mb={5}>
                      <FormLabel>Customer Bank Name</FormLabel>
                      <Input type='text' readOnly value={bankname} />
                    </Stack>

                    <Stack width={"45%"} mb={5}>
                      <FormLabel>Purpose of Payment</FormLabel>
                      <Input type='text' onChange={(event) => handleInputChange(event, setPurpose)} />
                    </Stack>
                    <Button colorScheme='purple' onClick={reqPayment.bind(null, customerid)} >Request Payment</Button>

                  </>) : (<>
                    <HStack mb={5} >
                      <Stack width={"50%"}>
                        <FormLabel>Customer Username</FormLabel>
                        <HStack>
                          <Input type='text' placeholder='Enter Customer Username'
                            onKeyPress={event => {
                              if (event.key === 'Enter') {
                                getData()
                              }
                            }}

                            onChange={(event) => handleInputChange(event, setCustomerUsername)} />
                          <Button colorScheme='purple' onClick={getData}  >Fetch</Button>
                        </HStack>
                      </Stack>
                    </HStack>
                  </>)}


                </FormControl>
              </CardBody>
            </Card>
          </Stack>
        </>)}

        <div ref={qr} ></div>
      </Sidebar>
    </>
  )
}

export default MerchantPaymentRequest