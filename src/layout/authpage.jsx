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
import { NavURL } from '../helper/Navlink';



const Links = [
  { name: "Home",url:NavURL?.Dashboard },
]

const NavLink = ({ children,url  }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={url?url:"#"}>
    {children}
  </Link>
);


export default function AuthNav({children}) {

  const { isOpen, onOpen, onClose } = useDisclosure();


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
              {Links.map((link,index) => (
                <NavLink key={index} url={link?.url&&link?.url}>{link?.name}</NavLink>
              ))}
            </HStack>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

          <Box p={4} height={"100%"}>{children }</Box>
    </>
  );
}