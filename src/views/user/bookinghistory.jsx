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

export const BookingHistory = () => {
    const [history, setHistory] = useState("")
  useEffect(() => {
      myBookings()
      
  }, [])

  const myBookings = async () => {
      const myhotelbookings = await apiCall.get("booking/booking-history");
      console.log(myhotelbookings?.data?.response?.Hotels)
      setHistory(myhotelbookings?.data?.response?.Hotels)

  }
  
  return (
    <TableContainer>
  <Table variant='simple'>
    <TableCaption>Booking History</TableCaption>
    <Thead>
      <Tr>
        <Th>S.N</Th>
        <Th>Hotel</Th>
        <Th>Check In Date</Th>
        <Th>Check Out Date</Th>
        <Th>Amount</Th>
      </Tr>
    </Thead>
              <Tbody>
{
       history&&history?.map((x,index)=>               
                 
      <Tr>
        <Td>{index+1}</Td>
        <Td>{x.Hotel.name }</Td>
        <Td>{x.check_in_date}</Td>
        <Td>{x.check_out_date}</Td>
        <Td>${x.amount}</Td>
    </Tr>
)}
      </Tbody>
  </Table>
</TableContainer>
  )
}
