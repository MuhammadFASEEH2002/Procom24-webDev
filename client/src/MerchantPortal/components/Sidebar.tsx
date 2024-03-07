'use client'
import { useEffect, useState } from 'react'
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
  useToast
} from '@chakra-ui/react'
import {
  FiHome,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiDollarSign,
  FiUsers,
  FiColumns
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { CiLogout , } from 'react-icons/ci'
import { IoCreateOutline } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../utils/api'
import { UserType } from '../../utils/types'
import { useCookies } from 'react-cookie'

import RoutesPath from '../../utils/routes'

interface LinkItemProps {
  name: string
  icon: IconType,
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
  { name: 'Home', icon: FiHome, link: RoutesPath.MERCHANT_DASHBOARD },
  { name: 'Payments', icon: FiDollarSign, link: RoutesPath.MERCHANT_PAYMENTS },
  { name: 'Customers', icon: FiUsers, link: RoutesPath.MERCHANT_CUSTOMERS },
  { name: 'Payment Request', icon: IoCreateOutline, link: RoutesPath.MERCHANT_PAYMENT_REQUEST },
  { name: 'Report', icon: FiColumns, link: RoutesPath.MERCHANT_REPORT },
  { name: 'Logout', icon: CiLogout, link: RoutesPath.MERCHANT_LOGOUT },


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
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
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
          bg: 'purple.400',
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

  const toast = useToast()

  const [user, setUser] = useState<UserType | undefined>();
  const navigate = useNavigate()
  const getUser = async () => {

    try {
      const response = await api.get('/api/merchant/get-me')
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

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
       
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    `https://placehold.co/600x400/orange/white?text=${user?.username.charAt(0).toUpperCase()}`
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">{user?.name}</Text>
                  <Text fontSize="xs" color="gray.600">
                   Merchant
                  </Text>
                </VStack>
         
              </HStack>
            </MenuButton>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}

interface SidebarMainProps {
  children: React.ReactNode
}

const Sidebar = ({ children }: SidebarMainProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [cookies] = useCookies();
  const navigate = useNavigate();

  async function checkToken() {
    const token = await cookies.merchantToken
    if (!token) {
      navigate(RoutesPath.MERCHANT_LOGIN)
    }
  }

  useEffect(() => {
    checkToken()
  }, []);

  return (
    <Box minH="100vh" bg={useColorModeValue('white.500', 'gray.900')}>
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
        {children}
      </Box>
    </Box>
  )
}

export default Sidebar