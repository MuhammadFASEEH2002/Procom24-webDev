import { useMediaQuery } from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
const data = [
    { name: 'Jan', revenue: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', revenue: 7340, pv: 2400, amt: 2400 },
    { name: 'March', revenue: 6320, pv: 2400, amt: 2400 },
    { name: 'April', revenue: 8120, pv: 2400, amt: 2400 },
    { name: 'May', revenue: 3760, pv: 2400, amt: 2400 },
    { name: 'Jun', revenue: 4230, pv: 2400, amt: 2400 },
    { name: 'Jul', revenue: 5450, pv: 2400, amt: 2400 },
    { name: 'Aug', revenue: 7220, pv: 2400, amt: 2400 },
    { name: 'Sep', revenue: 4350, pv: 2400, amt: 2400 },
    { name: 'Oct', revenue: 3230, pv: 2400, amt: 2400 },
    { name: 'Nov', revenue: 6230, pv: 2400, amt: 2400 },
    { name: 'Dec', revenue: 5230, pv: 2400, amt: 2400 },

];



export default function MerchantBarChart() {

    const [isSmallerThan560] = useMediaQuery('(max-width: 560px)')

    console.log("isSmallerThan560: " + isSmallerThan560)

    return (<BarChart width={isSmallerThan560 ?  320 : 600 } height={300} data={data}>
        <XAxis dataKey="name" stroke="#8884d8" />
        <YAxis />
        <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
        <Legend width={100} wrapperStyle={{ top: -20, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="revenue" fill="#8884d8" barSize={20} />
    </BarChart>)
}