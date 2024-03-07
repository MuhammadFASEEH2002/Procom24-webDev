import { HStack, VStack , Stack } from '@chakra-ui/react'

import Sidebar from './components/Sidebar.tsx'
import MerchantBarChart from './components/BarChart.tsx'
import MerchantPieChart from './components/PieChart.tsx'


const MerchantDashboard = () => {
  return (
    <>
    <Sidebar>
      <HStack w={'100%'} justify={'center'} m={4} >
        <MerchantBarChart />
        <MerchantPieChart />
      </HStack>
    </Sidebar>
    </>
  )
}

export default MerchantDashboard