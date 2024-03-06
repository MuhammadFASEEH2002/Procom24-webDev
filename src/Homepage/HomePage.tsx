import { Stack, Button } from '@chakra-ui/react'

import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <>
    <Link to={"/merchant/login"}>
    <Button>Merchant</Button>
    </Link>
    <Link to={"/customer/login"}>
    <Button>Customer</Button>
    </Link>

    </>
  )
}

export default Homepage