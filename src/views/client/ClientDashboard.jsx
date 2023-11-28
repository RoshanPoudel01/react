import { Box, Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import apiCall from "../../helper/Axios";

export const ClientDashboard = () => {
  const [counts, setcounts] = useState("")
  useEffect(() => {
    getAllCounts()
  }, [])

  const getAllCounts = async () => {
    const counts = await apiCall.get("auth/client-dashboard");
    console.log(counts?.data?.response?.hotelCount);
    // console.log(counts?.data?.response?.bookingCount);
    // console.log(counts?.data?.response?.userCount);
    // console.log(counts?.data?.response?.totalPayment[0]?.totalAmount);
    setcounts(counts?.data?.response)

  }
  return (
    <Flex direction='column'>
      <Box bg="tomato" w="30%" p={4} m={5} color="white">
        {/* Total Users:{counts?.userCount} */}
      </Box>
      <Box bg="Yellow" w="30%" p={4} m={5} color="black">
        Total Hotels:{counts?.hotelCount}
      </Box>
      <Box bg="Teal" w="30%" p={4} m={5} color="white">
        Total Bookings:{counts?.bookingCount}
      </Box>
      <Box bg="gray" w="30%" p={4} m={5} color="white">
        {/* Total Payment:${counts?.totalPayment[0]?.totalAmount} */}
      </Box>
    </Flex>
  )
}
