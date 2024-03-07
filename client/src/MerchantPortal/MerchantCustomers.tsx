import { HStack, Heading } from "@chakra-ui/react"
import Sidebar from "./components/Sidebar"
import JTable from "../components/Table"
import { useEffect, useState } from "react"
import api from "../utils/api"
import { CustomerDataType } from "../utils/types"

const tableHeads = ['customer', 'email', 'phone', 'bank', 'accountnumber']



export default function MerchantCustomers() {
    
    const [ customers , setCustomers ] = useState<CustomerDataType[] | []>([])
    const heads = ['name', 'email', 'phonenumber', 'bankname', 'accountnumber']


    useEffect(()=>{
        loadCustomers()
    },[])


    const loadCustomers = async () => {
        const { data } = await api.get('/api/merchant/get-all-customer-data');
        const { customer } = data;
        if(customers){
            setCustomers(customer);
        }
    }

    return (
        <>
            <Sidebar active="Customers">
                <HStack p={4} mb={4}>
                    <Heading>Customers</Heading>
                </HStack>
               {customers.length > 0 && <JTable tableHeads={tableHeads} tableData={customers} heads={heads} />}
            </Sidebar>
        </>
    )
}