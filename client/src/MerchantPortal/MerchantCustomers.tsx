import { HStack, Heading } from "@chakra-ui/react"
import Sidebar from "./components/Sidebar"
import JTable from "../components/Table"
import { useEffect, useState } from "react"
import api from "../utils/api"


const tableHeads = ['customer', 'email', 'phone', 'bank', 'created At',]
const heads = ['customer', 'email', 'phone', 'bank', 'createdAt']
const tableData = [
    {
        customer: 'John Doe',
        email: 'JohnDoe@gmail.com',
        phone: '+923161234567',
        bank: 'Meezan Bank',
        createdAt: '12/12/2021',
    },
    {
        customer: 'Faseeh',
        email: 'JohnDoe@gmail.com',
        phone: '+923161234567',
        bank: 'Meezan Bank',
        createdAt: '12/12/2021',
    },
    {
        customer: 'Faiez',
        email: 'JohnDoe@gmail.com',
        phone: '+923161234567',
        bank: 'Meezan Bank',
        createdAt: '12/12/2021',
    },
    {
        customer: 'John Doe',
        email: 'JohnDoe@gmail.com',
        phone: '+923161234567',
        bank: 'Meezan Bank',
        createdAt: '12/12/2021',
    },
    {
        customer: 'Faseeh',
        email: 'JohnDoe@gmail.com',
        phone: '+923161234567',
        bank: 'Meezan Bank',
        createdAt: '12/12/2021',
    },
    {
        customer: 'Faiez',
        email: 'JohnDoe@gmail.com',
        phone: '+923161234567',
        bank: 'Meezan Bank',
        createdAt: '12/12/2021',
    },
    {
        customer: 'John Doe',
        email: 'JohnDoe@gmail.com',
        phone: '+923161234567',
        bank: 'Meezan Bank',
        createdAt: '12/12/2021',
    },
    {
        customer: 'Faseeh',
        email: 'JohnDoe@gmail.com',
        phone: '+923161234567',
        bank: 'Meezan Bank',
        createdAt: '12/12/2021',
    },
    {
        customer: 'Faiez',
        email: 'JohnDoe@gmail.com',
        phone: '+923161234567',
        bank: 'Meezan Bank',
        createdAt: '12/12/2021',
    },
    {
        customer: 'John Doe',
        email: 'JohnDoe@gmail.com',
        phone: '+923161234567',
        bank: 'Meezan Bank',
        createdAt: '12/12/2021',
    },
    {
        customer: 'Faseeh',
        email: 'JohnDoe@gmail.com',
        phone: '+923161234567',
        bank: 'Meezan Bank',
        createdAt: '12/12/2021',
    },
    {
        customer: 'Faiez',
        email: 'JohnDoe@gmail.com',
        phone: '+923161234567',
        bank: 'Meezan Bank',
        createdAt: '12/12/2021',
    },
    {
        customer: 'John Doe',
        email: 'JohnDoe@gmail.com',
        phone: '+923161234567',
        bank: 'Meezan Bank',
        createdAt: '12/12/2021',
    },
    {
        customer: 'Faseeh',
        email: 'JohnDoe@gmail.com',
        phone: '+923161234567',
        bank: 'Meezan Bank',
        createdAt: '12/12/2021',
    },
    {
        customer: 'Faiez',
        email: 'JohnDoe@gmail.com',
        phone: '+923161234567',
        bank: 'Meezan Bank',
        createdAt: '12/12/2021',
    },
    {
        customer: 'John Doe',
        email: 'JohnDoe@gmail.com',
        phone: '+923161234567',
        bank: 'Meezan Bank',
        createdAt: '12/12/2021',
    },
    {
        customer: 'Faseeh',
        email: 'JohnDoe@gmail.com',
        phone: '+923161234567',
        bank: 'Meezan Bank',
        createdAt: '12/12/2021',
    },
    {
        customer: 'Faiez',
        email: 'JohnDoe@gmail.com',
        phone: '+923161234567',
        bank: 'Meezan Bank',
        createdAt: '12/12/2021',
    },
    {
        customer: 'John Doe',
        email: 'JohnDoe@gmail.com',
        phone: '+923161234567',
        bank: 'Meezan Bank',
        createdAt: '12/12/2021',
    },
    {
        customer: 'Faseeh',
        email: 'JohnDoe@gmail.com',
        phone: '+923161234567',
        bank: 'Meezan Bank',
        createdAt: '12/12/2021',
    },

]


export default function MerchantCustomers() {

    const [ customers , setCustomers ] = useState([])


    useEffect(()=>{
        loadCustomers()
    },[])


    const loadCustomers = async () => {
        const { data } = await api.get('/api/merchant/get-all-customer-data');
        console.log(data)
    }

    return (
        <>
            <Sidebar>
                <HStack p={4} mb={4}>
                    <Heading>Customers</Heading>
                </HStack>
                <JTable tableHeads={tableHeads} tableData={tableData} heads={heads} />
            </Sidebar>
        </>
    )
}