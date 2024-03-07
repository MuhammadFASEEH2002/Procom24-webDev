import { HStack, Heading, Button, Card, Text, Badge } from "@chakra-ui/react"
import Sidebar from "./components/Sidebar"
import { FaDownload, FaPlus, } from "react-icons/fa6"
import { IoGrid } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoTimerOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import JTable from "../components/Table";

import RoutesPath from "../utils/routes";

const tableHeads = ['account no', 'status', 'description', 'bank', 'date', 'customer', 'amount']
const heads = ['accountNo', 'status', 'description', 'bank', 'date', 'customer', 'amount']
const tableData = [
    {
        accountNo: '1934578934',
        status: 'pending',
        description: 'Payment for order 123456',
        bank: 'Meezan Bank',
        date: '12/12/2021',
        customer: 'John Doe',
        amount: '$100.00',
    },
    {
        accountNo: '948578',
        status: 'approved',
        description: 'Payment for order 24354',
        bank: 'Bank of Al-Habib',
        date: '12/12/2021',
        customer: 'John Doe',
        amount: '$100.00',
    },
]
export default function MerchantPayments() {
    return (
        <>
            <Sidebar>
                <HStack justifyContent={'space-between'}>
                    <Heading>Payments</Heading>
                    <HStack>
                        <Button colorScheme={'purple'} variant={'outline'} leftIcon={<FaDownload />}>
                            Export
                        </Button>
                        <Link to={RoutesPath.MERCHANT_PAYMENT_REQUEST}>
                            <Button colorScheme={'purple'} leftIcon={<FaPlus />}>
                                Payment Request
                            </Button>
                        </Link>
                    </HStack>
                </HStack>
                <HStack justifyContent={'space-evenly'} my={5} >
                    <StatCard colorscheme="purple" title="All Payments" recordsCount={234} amount={2345} icon={<IoGrid />} />
                    <StatCard colorscheme="green" title="Succeeded" recordsCount={234} amount={3434} icon={<FaCheck />} />
                    <StatCard colorscheme="yellow" title="Pending" recordsCount={234} amount={3434} icon={<IoTimerOutline />} />
                    <StatCard colorscheme="red" title="Rejected" recordsCount={234} amount={3434} icon={<MdCancel />} />
                </HStack>
                <JTable tableData={tableData} tableHeads={tableHeads} heads={heads} />
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