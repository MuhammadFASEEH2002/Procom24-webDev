import { Card, Text, HStack, Badge, Button, Heading } from "@chakra-ui/react"

import Sidebar from "./components/Sidebar"
import { IoGrid } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

import JTable from "../components/Table"



const tableHeads = ['account no', 'status', 'description', 'time', 'date', 'amount']
const heads = ['accountNo', 'status', 'description', 'time', 'date', 'amount']
const tableData = [
  {
    accountNo: '1934578934',
    status: 'pending',
    description: 'Payment for order 123456',
    time: '12:29PM',
    date: '12/12/2021',
    amount: '$100.00',
  },
  {
    accountNo: '948578',
    status: 'approved',
    description: 'Payment for order 24354',
    time: '12:29PM',
    date: '12/12/2021',
    amount: '$100.00',
  },
]

const CustomerPayments = () => {


  const handleAction = (type: string, payload: any) => {
    console.log(type, payload)
  }

  return (
    <>
      <Sidebar>
        <HStack justifyContent={'space-between'}>
          <Heading>Payments</Heading>
        </HStack>
        <HStack justifyContent={'space-evenly'} my={5} >
          <StatCard colorscheme="purple" title="All Payments" recordsCount={234} icon={<IoGrid />} />
          <StatCard colorscheme="green" title="Succeeded" recordsCount={234} icon={<FaCheck />} />
          <StatCard colorscheme="red" title="Rejected" recordsCount={234} icon={<MdCancel />} />
        </HStack>
        <JTable tableData={tableData} tableHeads={tableHeads} heads={heads} size="sm"
          action={handleAction}
          isAction
        />
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