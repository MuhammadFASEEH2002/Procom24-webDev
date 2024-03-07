'use client'

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useToast,
  Image
} from '@chakra-ui/react'
import {
  FiHome,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi'
import { IconType } from 'react-icons'

import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { CiLogout } from "react-icons/ci";
import { FiDollarSign } from 'react-icons/fi'
import { FaCircleDollarToSlot } from "react-icons/fa6"
import api from '../../utils/api'
import RoutesPath from '../../utils/routes'

interface LinkItemProps {
  name: string
  icon: IconType
  link: string
}

interface NavItemProps extends FlexProps {
  icon: IconType
  children: React.ReactNode
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Payments', icon: FiDollarSign, link: RoutesPath.CUSTOMER_PAYMENTS },
  { name: 'Logout', icon: CiLogout, link: RoutesPath.CUSTOMER_LOGOUT },

]

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
      <Image
        boxSize='50px'
        objectFit='cover'
        src='../../src/assets/logo.png'
        alt='Dan Abramov'
      />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <Link to={link.link}>
          <NavItem key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
        </Link>
      ))}
    </Box>
  )
}

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  type User = {
    _id: Object,
    name: string,
    username: string,
    email: string,
    bankname: string,
    accountnumber: string,
    password: string,
    phonenumber: string
  };
  const toast = useToast()

  const [user, setUser] = useState<User | undefined>();
  const navigate = useNavigate()
  const getUser = async () => {

    try {
      const response = await api.get('/api/customer/get-me')
      if (response.data.status) {
        setUser(response.data.me)
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
    } catch (error) {

    }
  };
  useEffect(() => {
    // Effect function
    getUser()
  }, []);
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Image
           display={{ base: 'flex', md: 'none' }}
        boxSize='40px'
        objectFit='cover'
        src='../../src/assets/logo.png'
        alt='Dan Abramov'
      />

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                {/* <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                /> */}
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">{user?.name}</Text>

                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>

                </Box>
              </HStack>
            </MenuButton>

          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}
const Sidebar = ({ children } : { children: React.ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [cookies] = useCookies();
  const navigate = useNavigate();

  async function checkToken() {
    const token = await cookies.customerToken
    if (!token) {
      navigate(RoutesPath.CUSTOMER_LOGIN)
    }
  }

  useEffect(() => {
    checkToken()
  }, []);

  return (
    <Box minH="100vh" bg={useColorModeValue('white.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content */}
        {children}
      </Box>
    </Box>
  )
}

export default Sidebar