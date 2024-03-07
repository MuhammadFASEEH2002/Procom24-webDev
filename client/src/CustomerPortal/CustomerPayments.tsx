import { Card, Text, HStack, Badge, Button, Heading, useToast } from "@chakra-ui/react"

import Sidebar from "./components/Sidebar"
import { IoGrid } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

import JTable from "../components/Table"
import { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router";
import RoutesPath from "../utils/routes";



const tableHeads = ['store', 'account no', 'status', 'description', 'date', 'amount']
const heads = ['name', 'customer_account_number', 'status', 'purpose', 'createdAt', 'amount']


const CustomerPayments = () => {


  const [transactions, setTransactions] = useState([])

  const handleAction = async (type: string, payload: any) => {
    console.log(type, payload)

    if(type === 'PAY'){
       const {  data } = await api.post('/api/customer/pay-transaction', { 
        transaction_id : payload._id
      })
     const {status} = data

     console.log(status)
     if(status){
     window.location.reload()
    }
    
  }else{
    const { data } = await api.post('/api/customer/reject-transaction', {
      transaction_id: payload._id
    })
    const { status } = data
    if (status) {
        window.location.reload()
      }
    }

  }

  useEffect(() => {
    loadTransations()
    getStats()
  }, [])

  const loadTransations = async () => {
    const { data } = await api.get('/api/customer/get-all-transaction')
    const { status, myTransactions } = data
    if (status) {
      setTransactions([])
      setTransactions(myTransactions)
    }
  }


  const [transactionCount, setTransactionCount] = useState<string>("")
  const [approvedTransactionCount, setApprovedTransactionCount] = useState<string>("")
  const [rejectTransactionCount, setRejectTransactionCount] = useState<string>("")



  const toast = useToast()
  const navigate = useNavigate()

  async function getStats() {
    try {
      const response = await api.get('/api/customer/get-stats')
      // console.log(response.data);
      if (response.data.status) {
        setTransactionCount(response.data.totalTransactions)
        setApprovedTransactionCount(response.data.successTransaction)
        setRejectTransactionCount(response.data.rejectTransaction)


      } else {
        toast({
          title: "Auth Error",
          description: response.data.message,
          status: "error",
          position: "top",
          duration: 5000,
          isClosable: true
        })

      }
    }

    catch (error) {
      toast({
        title: "Network Error",

        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true
      })
    }
  }
  return (
    <>
      <Sidebar>
        <HStack justifyContent={'space-between'}>
          <Heading>Payments</Heading>
        </HStack>
        <HStack justifyContent={'space-evenly'} my={5} >
          <StatCard colorscheme="purple" title="All Payments" recordsCount={Number(transactionCount)} icon={<IoGrid />} />
          <StatCard colorscheme="green" title="Succeeded" recordsCount={Number(approvedTransactionCount)} icon={<FaCheck />} />
          <StatCard colorscheme="red" title="Rejected" recordsCount={Number(rejectTransactionCount)} icon={<MdCancel />} />
        </HStack>
        {transactions.length > 0 && <JTable tableData={transactions} tableHeads={tableHeads} heads={heads} size="sm"
          action={handleAction}
          isAction
        />}
      </Sidebar>
    </>
  )
}

interface StatsProps {
  title: string,
  recordsCount: number,
  colorscheme: string,
  icon: any
}

const StatCard = (props: StatsProps) => {
  return <Card
    direction={'column'}
    overflow='hidden'
    variant='outline'
    backgroundColor={`${props.colorscheme}.50`}
    borderColor={props.colorscheme}
    colorScheme={props.colorscheme}
    padding={4}
    minW={'30%'}
  >
    <HStack justifyContent={'space-between'} width={'100%'} >
      <Text>{props.title}</Text>
      <Button colorScheme={props.colorscheme}>
        {props.icon}
      </Button>
    </HStack>
    <HStack mt={2}>
      <Badge colorScheme={props.colorscheme} p={1} >{props.recordsCount} records</Badge>
    </HStack>

  </Card>
}


export default CustomerPayments