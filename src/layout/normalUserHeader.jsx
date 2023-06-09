import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
// import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircle } from "react-icons/io";
import { GrLogin, GrLogout } from "react-icons/gr";
import { NavURL } from '../helper/Navlink';
import apiCall from "../helper/Axios";
import { useNavigate } from 'react-router';


const Links = [
  { name: "Home", url: NavURL?.Dashboard },
  { name: "Profile", url: NavURL?.profile },
  { name: "Bookings", url: NavURL?.bookinghistory },
]

const NavLink = ({ children, url }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={url ? url : "#"}>
    {children}
  </Link>
);


export default function NormalUserNav({ children }) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const logout = async () => {
    // api call logout 
    const logout = await apiCall.get("auth/logout")
    localStorage.removeItem('usertoken');
    localStorage.removeItem('userrole');
    // navigate
    navigate('/login')


  }
  const login = () => {
    navigate('/login')

  }

  return (
    <>
      <Box bg="whiteblue.background" color="whiteblue.color" px={10} borderRadius={15} m={4} position={"sticky"}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <IoMdCloseCircle /> : <GiHamburgerMenu />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>

            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link, index) => (
                <NavLink key={index} url={link?.url && link?.url}>{link?.name}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            {localStorage.usertoken &&
              <Button
                variant={'solid'}
                onClick={logout}
                colorScheme={'teal'}
                size={'sm'}
                mr={4}
                leftIcon={< GrLogout />}>
                Logout
              </Button>
            }
            {!localStorage.usertoken &&
              <Button
                variant={'solid'}
                onClick={login}
                colorScheme={'teal'}
                size={'sm'}
                mr={4}
                leftIcon={< GrLogin />}>
                Login
              </Button>
            }
            {/* <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu> */}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link, index) => (
                <NavLink key={index} url={link?.url && link?.url}>{link?.name}</NavLink>

              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4} height={"100%"}>{children}</Box>
    </>
  );
}