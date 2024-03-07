'use client'

import {
    HStack,
    Image,
    Stack,
    Text,
} from '@chakra-ui/react'
import { IoMdRefresh } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";


const ImageMockup = ({ img , url} : any) => {

    return <Stack boxShadow={'md'} height={400} pt={2} m={4}>
        <HStack justify={'space-between'} p={2} >
            <HStack>
                <Stack w={5} height={5} rounded={'full'} bg={'red.400'} ></Stack>
                <Stack w={5} height={5} rounded={'full'} bg={'yellow.400'} ></Stack>
                <Stack w={5} height={5} rounded={'full'} bg={'green.400'} ></Stack>
            </HStack>
            <HStack width={'60%'} justify={'space-between'} px={5} py={1} color={'white'} mr={10} bg={'black'} rounded={7} >
                <IoMdRefresh />
                <Text>PayEaze.pk{url}</Text>
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


export default ImageMockup