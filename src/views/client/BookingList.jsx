import React, { useEffect, useState } from 'react'
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
} from '@chakra-ui/react'
export const BookingList = () => {
  const [hotelbookings, sethotelbookings] = useState("")
  useEffect(() => {
    myHotelBookings()
  }, [])

  const myHotelBookings = async () => {
      const myhotelbookings = await apiCall.get("booking/my-hotel-bookings");
    console.log(myhotelbookings?.data?.response?.Bookings)
    sethotelbookings(myhotelbookings?.data?.response?.Bookings)
  }
  
  return (
   <TableContainer>
  <Table variant='simple'>
    <TableCaption>Booking </TableCaption>
    <Thead>
      <Tr>
        <Th>S.N</Th>
        <Th>Hotel</Th>
        <Th>Check In Date</Th>
            <Th>Check Out Date</Th>
        <Th>Amount</Th>
        <Th>Booked By</Th>
            
      </Tr>
    </Thead>
              <Tbody>
{
       hotelbookings&&hotelbookings?.map((x,index)=>               
                 
      <Tr>
        <Td>{index+1}</Td>
        <Td>{x.Hotel.name }</Td>
        <Td>{x.check_in_date}</Td>
        <Td>{x.check_out_date}</Td>
           <Td>${x.amount}</Td>
           <Td>{x.bookedBy.name}</Td>
    </Tr>
)}
      </Tbody>
  </Table>
</TableContainer>
  )
}
