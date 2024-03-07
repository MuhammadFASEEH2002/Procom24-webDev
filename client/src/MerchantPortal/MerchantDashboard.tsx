import { HStack, Heading, Button, Card, Text, Badge, useToast } from "@chakra-ui/react"

import Sidebar from './components/Sidebar.tsx'
import MerchantBarChart from './components/BarChart.tsx'
import { FaDownload, FaPlus, } from "react-icons/fa6"
import { IoGrid } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { IoTimerOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import api from "../utils/api.ts";
import { useEffect, useState } from "react";
import RoutesPath from "../utils/routes.ts"

const MerchantDashboard = () => {
  const [totalAmount, setTotalAmount] = useState<string>("")
  const [payedAmount, setPayedAmount] = useState<string>("")

  const [rejectAmount, setRejectAmount] = useState<string>("")

  const [pendingAmount, setPendingAmount] = useState<string>("")
  const [transactionCount, setTransactionCount] = useState<string>("")


  const toast = useToast()
  const navigate = useNavigate()
  useEffect(() => {
    getStats()
  }, []);

  async function getStats() {
    try {
      const response = await api.get('/api/merchant/get-stats')
      // console.log(response.data);
      if (response.data.status) {
        setTotalAmount(response.data.totalAmount)
        setPayedAmount(response.data.payedAmount)

        setRejectAmount(response.data.rejectAmount)

        setPendingAmount(response.data.pendingAmount)
        setTransactionCount(response.data.totalTransactions)

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
      navigate(RoutesPath.HOME)
    }
  }
  return (
    <>
      <Sidebar active="Home" >

        <HStack justifyContent={'space-evenly'} my={5} >
          <StatCard colorscheme="purple" title="All Payments" recordsCount={Number(transactionCount)} amount={Number(totalAmount)} icon={<IoGrid />} />
          <StatCard colorscheme="green" title="Succeeded" recordsCount={Number(transactionCount)} amount={Number(payedAmount)} icon={<FaCheck />} />
          <StatCard colorscheme="yellow" title="Pending" recordsCount={Number(transactionCount)} amount={Number(pendingAmount)} icon={<IoTimerOutline />} />
          <StatCard colorscheme="red" title="Rejected" recordsCount={Number(transactionCount)} amount={Number(rejectAmount)} icon={<MdCancel />} />
        </HStack>
        <HStack mt={5} mb={5}>
          <Heading>Yearly Income</Heading>
        </HStack>
        <HStack w={'100%'} justify={'center'} m={4} >
          <MerchantBarChart />
        </HStack>
      </Sidebar>
    </>
  )
}

interface StatsProps {
  title: string,
  recordsCount: number,
  amount: number,
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
    minW={'24%'}
  >
    <HStack justifyContent={'space-between'} width={'100%'} >
      <Text>{props.title}</Text>
      <Button colorScheme={props.colorscheme}>
        {props.icon}
      </Button>
    </HStack>
    <HStack>
      <Heading>{props.amount} PKR</Heading>
    </HStack>
    <HStack mt={2}>
      <Badge colorScheme={props.colorscheme} p={1} >{props.recordsCount} records</Badge>
    </HStack>

  </Card>
}

export default MerchantDashboard