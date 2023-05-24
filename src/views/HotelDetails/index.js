import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    VisuallyHidden,
    List,
    ListItem,
    useDisclosure,
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import Booking from "../Booking/Booking_form";

import apiCall from "../../helper/Axios";
  
import { useEffect, useState } from 'react';
  import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
  import { MdLocalShipping } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from "react-router";

import { toast } from 'react-hot-toast';

export default function Simple() {
  const navigate = useNavigate();
  const bookHotel = async (data) => {
  navigate("/booking");
    // try {
    //     console.log("sdads")
     
    // } catch (e) {
     
    // }
};

 const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("product_id")
  console.log(id)
  useEffect(() => {
  if (id) {
  getHotelDetails()
    
  }
  }, [id])
  const [hotel, setHotel] = useState(null)
  const getHotelDetails = async () => {
   
    const result = await apiCall.get(`hotel/hotel-details?id=${id}`);
    console.log(result?.data)
    //check hotel response
    setHotel(result?.data?.response)
  }
 const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <Container maxW={'7xl'}>
        {console.log(hotel)}
        {hotel!==null&&
      (  <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}>
          <Flex>
            <Image
              rounded={'md'}
              alt={'product image'}
              src={hotel?.bannerimage}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={{ base: '100%', sm: '400px', lg: '500px' }}
              fallbackSrc='https://images.unsplash.com/photo-1596516109370-29001ec8ec36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODE1MDl8MHwxfGFsbHx8fHx8fHx8fDE2Mzg5MzY2MzE&ixlib=rb-1.2.1&q=80&w=1080'
            />
          </Flex>
          
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
               {hotel.name}
              </Heading>
              <Text
                // color={useColorModeValue('gray.900', 'gray.400')}
                fontWeight={300}
                fontSize={'2xl'}>
                ${hotel.price}
              </Text>
            </Box>
  
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={
                <StackDivider
                  // borderColor={useColorModeValue('gray.200', 'gray.600')}
                />
              }>
              <VStack spacing={{ base: 4, sm: 6 }}>
                {/* <Text
                  // color={useColorModeValue('gray.500', 'gray.400')}
                  fontSize={'2xl'}
                  fontWeight={'300'}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore
                </Text> */}
                <Text fontSize={'lg'}>
                 {hotel.description}
                </Text>
              </VStack>
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  // color={useColorModeValue('yellow.500', 'yellow.300')}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}>
                  Features
                </Text>
  
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    {hotel?.feature && hotel?.feature?.length > 0 && hotel?.feature?.map((data) => {
                      return <ListItem>{data?.name[0]}</ListItem>
                      
                    })

                    
                    }
                  </List>
                  {/* <List spacing={2}>
                    <ListItem>Anti‑magnetic</ListItem>
                    <ListItem>Chronometer</ListItem>
                    <ListItem>Small seconds</ListItem>
                  </List> */}
                </SimpleGrid>
              </Box>
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  // color={useColorModeValue('yellow.500', 'yellow.300')}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}>
                  Contact Us At 
                </Text>
  
                <List spacing={2}>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Phone:
                    </Text>{' '}
                    {hotel.phone}
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Email:
                    </Text>{' '}
                    {hotel.email}
                  </ListItem>
                 
                </List>
              </Box>
            </Stack>
  
            <Button
              rounded={'none'}
              type={'submit'}
              w={'full'}
              mt={8}
              size={'lg'}
              py={'7'}
              onClick={onOpen}
              // bg={useColorModeValue('gray.900', 'gray.50')}
              // color={useColorModeValue('white', 'gray.900')}
              textTransform={'uppercase'}
              _hover={{
                transform: 'translateY(2px)',
                boxShadow: 'lg',
              }}>
             Book Now
            </Button>
   <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
                  <Booking id={hotel?._id}
                  />
          </ModalBody>
        </ModalContent>
      </Modal>
          </Stack>
          </SimpleGrid>)
}
      </Container>
    );
  }