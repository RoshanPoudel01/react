import React, { useEffect, useState } from 'react'
import toast, { Toaster } from "react-hot-toast";

import apiCall from "../../helper/Axios";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Badge,
  Flex,
} from '@chakra-ui/react'
import { useNavigate, useLocation } from 'react-router';

export const HotelList = () => {
  const [hotels, sethotels] = useState("")
  useEffect(() => {
    getMyhotels()
  }, [])
  const navigate = useNavigate()
  const location = useLocation()
  const handleDetails = (id) => {
    navigate(`/add-hotel?hotel_id=${id}`);
  }


  const getMyhotels = async () => {
    const myhotels = await apiCall.get("hotel/myhotel");
    console.log(myhotels?.data?.response)
    sethotels(myhotels?.data?.response)
    if (location?.state?.message) {
      toast.success(location?.state?.message)
    }

  };
  return (
    <Flex>
      <Toaster position="top-right" reverseOrder={false} />

      <TableContainer>
        <Table variant='striped' colorScheme='teal'>
          <TableCaption>My Hotels</TableCaption>
          <Thead>
            <Tr>
              <Th>S.N</Th>
              <Th>Name</Th>
              <Th>Address</Th>
              <Th>Email</Th>
              <Th isNumeric>Price Per Day</Th>


            </Tr>
          </Thead>
          <Tbody>
            {
              // console.log(hotels)
              hotels && hotels?.map((x, index) =>
                <Tr>
                  <Td>{index + 1}</Td>
                  <Td onClick={() => { handleDetails(x._id) }}>{x.name}</Td>
                  <Td>{x.address}</Td>
                  <Td>{x.email}</Td>
                  <Td isNumeric>${x.price}</Td>

                </Tr>
              )
            }
          </Tbody>

        </Table>
      </TableContainer>

    </Flex>
  )
}
