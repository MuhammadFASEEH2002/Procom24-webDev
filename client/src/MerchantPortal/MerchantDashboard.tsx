import { HStack, Heading, Button, Card, Text, Badge } from "@chakra-ui/react"

import Sidebar from './components/Sidebar.tsx'
import MerchantBarChart from './components/BarChart.tsx'


import { FaDownload, FaPlus, } from "react-icons/fa6"
import { IoGrid } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoTimerOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

const MerchantDashboard = () => {
  return (
    <>
      <Sidebar active="Home" >

        <HStack justifyContent={'space-evenly'} my={5} >
          <StatCard colorscheme="purple" title="All Payments" recordsCount={234} amount={2345} icon={<IoGrid />} />
          <StatCard colorscheme="green" title="Succeeded" recordsCount={234} amount={3434} icon={<FaCheck />} />
          <StatCard colorscheme="yellow" title="Pending" recordsCount={234} amount={3434} icon={<IoTimerOutline />} />
          <StatCard colorscheme="red" title="Rejected" recordsCount={234} amount={3434} icon={<MdCancel />} />
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