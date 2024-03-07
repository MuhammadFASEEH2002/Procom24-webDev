'use client'

import {
    Button,
    Flex,
    HStack,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import RoutesPath from '../../utils/routes'
import hero_bg from '../../assets/home_hero.png'
import { IoMdRefresh } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";

export default function Hero() {
    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={6} w={'full'} maxW={'lg'}>
                    <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                        <Text
                            as={'span'}
                            position={'relative'}
                            _after={{
                                content: "''",
                                width: 'full',
                                height: useBreakpointValue({ base: '20%', md: '30%' }),
                                position: 'absolute',
                                bottom: 1,
                                left: 0,
                                bg: 'purple.400',
                                zIndex: -1,
                            }}>
                            PayEaze
                        </Text>
                        <br />{' '}
                        <Text color={'purple.400'} as={'span'}>
                            Payments Made Easy
                        </Text>{' '}
                    </Heading>
                    <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                        PayEaze makes it easier for merchants and customers to make their payments in one go. Sign up today and explore.
                    </Text>
                    <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                        <Link to={RoutesPath.MERCHANT_LOGIN} >
                            <Button
                                bg={'purple.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'purple.500',
                                }}>
                                Merchant
                            </Button>
                        </Link>
                        <Link to={RoutesPath.CUSTOMER_LOGIN} >
                            <Button variant={'outline'}>Customer</Button>
                        </Link>
                    </Stack>
                </Stack>
            </Flex>
            <Flex flex={1} justify={'center'} alignItems={'center'}>
                <ImageMockup
                    img={hero_bg}
                />
            </Flex>
        </Stack>
    )
}

const ImageMockup = ({ img } : any) => {

    return <Stack boxShadow={'md'} height={400} pt={2} m={4}>
        <HStack justify={'space-between'} p={2} >
            <HStack>
                <Stack w={5} height={5} rounded={'full'} bg={'red.400'} ></Stack>
                <Stack w={5} height={5} rounded={'full'} bg={'yellow.400'} ></Stack>
                <Stack w={5} height={5} rounded={'full'} bg={'green.400'} ></Stack>
            </HStack>
            <HStack width={'60%'} justify={'space-between'} px={5} py={1} color={'white'} mr={10} bg={'black'} rounded={7} >
                <IoMdRefresh />
                <Text>PayEaze.pk</Text>
                <SlOptionsVertical />
            </HStack>
        </HStack>

        <Image
            alt={'Login Image'}
            objectFit={'contain'}
            src={img}
            width={'100%'}
            height={'80%'}
        />
    </Stack>
}