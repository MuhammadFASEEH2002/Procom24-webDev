import { HStack, Heading, Button, Card, Text, Badge, useToast } from "@chakra-ui/react"
import Sidebar from "./components/Sidebar"
import { FaDownload, FaPlus, } from "react-icons/fa6"
import { IoGrid } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { IoTimerOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import JTable from "../components/Table";

import RoutesPath from "../utils/routes";
import { useEffect, useState } from "react";
import api from "../utils/api";

const tableHeads = ['customer', 'account no', 'status', 'description', 'date', 'amount']
const heads = ['name', 'customer_account_number', 'status', 'purpose', 'createdAt', 'amount']
export default function MerchantPayments() {

    const [transactions, setTransavtions] = useState([])

    useEffect(() => {
        loadPayments()
        getStats()
    }, [])


    const [totalAmount, setTotalAmount] = useState<string>("")
    const [payedAmount, setPayedAmount] = useState<string>("")

    const [rejectAmount, setRejectAmount] = useState<string>("")

    const [pendingAmount, setPendingAmount] = useState<string>("")
    const [transactionCount, setTransactionCount] = useState<string>("")


    const toast = useToast()
    const navigate = useNavigate()


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
    const loadPayments = async () => {
        const { data } = await api.get('/api/merchant/get-my-payment-requests/')
        console.log(data)
        const { status, myTransactions } = data
        if (status) {
            setTransavtions(myTransactions)
        }
    }

    const exportPayment  = async () =>{
        const { data } = await api.get('/api/merchant/export/payments/')
        console.log(data)
        const a = document.createElement('a')
        a.href = `${process.env.AXIOS_LINK}/static/payments.csv`
        a.download = 'payments.csv'
        a.click()
    } 

    return (
        <>
            <Sidebar active="Payments" >
                <HStack justifyContent={'space-between'} flexWrap={'wrap'}>
                    <Heading>Payments</Heading>
                    <HStack>
                        <Button colorScheme={'purple'} variant={'outline'} leftIcon={<FaDownload />}
                        
                        onClick={exportPayment}
                        >
                            Export
                        </Button>
                        <Link to={RoutesPath.MERCHANT_PAYMENT_REQUEST}>
                            <Button colorScheme={'purple'} leftIcon={<FaPlus />}>
                                Payment Request
                            </Button>
                        </Link>
                    </HStack>
                </HStack>
                <HStack justifyContent={'space-evenly'} my={5} flexWrap={'wrap'} >
                    <StatCard colorscheme="purple" title="All Payments" recordsCount={Number(transactionCount)} amount={Number(totalAmount)} icon={<IoGrid />} />
                    <StatCard colorscheme="green" title="Succeeded" recordsCount={Number(transactionCount)} amount={Number(payedAmount)} icon={<FaCheck />} />
                    <StatCard colorscheme="yellow" title="Pending" recordsCount={Number(transactionCount)} amount={Number(pendingAmount)} icon={<IoTimerOutline />} />
                    <StatCard colorscheme="red" title="Rejected" recordsCount={Number(transactionCount)} amount={Number(rejectAmount)} icon={<MdCancel />} />
                </HStack>
                {transactions.length > 0 && <JTable tableData={transactions} tableHeads={tableHeads} heads={heads} size="sm" />}
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