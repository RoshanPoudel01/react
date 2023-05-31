import React, { useState, useEffect } from 'react'
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
} from '@chakra-ui/react'
import apiCall from "../../helper/Axios";
export const GetPaymentLog = () => {
    const [Payments, setPayments] = useState("")
    const [date, setdate] = useState(new Date())
    useEffect(() => {
        payments()
        getCurrentTime()
    }, [])


    const payments = async () => {
        const paymentapi = await apiCall.get("booking/allpayments")
        // console.log(paymentapi?.data?.response?.Payments)

        // console.log(paymentapi?.data?.response?.Payments?.transaction_detail?.expires_at)
        setPayments(paymentapi?.data?.response?.Payments)
    }
    const getCurrentTime = () => {
        const date = new Date()
        console.log(date)
    }
    const handleUrl = (data) => {
        console.log(data?.transaction_detail?.url)
        window.open(data?.transaction_detail?.url, "")
    }
    return (
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>Payments Log</TableCaption>
                <Thead>
                    <Tr>
                        <Th>S.N</Th>
                        <Th>Hotel</Th>
                        <Th>Created At</Th>
                        <Th>Amount</Th>
                        <Th>Status</Th>
                        <Th>Pay Now</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        Payments && Payments?.map((x, index) =>

                            <Tr>
                                {console.log(x)}
                                <Td>{index + 1}</Td>
                                <Td>{x.Hotel.name}</Td>
                                <Td>{x.createdAt}</Td>
                                <Td>${x.amount}</Td>
                                {new Date(x?.transaction_detail?.expires_at * 1000) > date && !x?.paid &&

                                    < Td >  <Badge colorScheme='purple'>Pending</Badge>
                                    </Td>
                                }
                                {new Date(x?.transaction_detail?.expires_at * 1000) < date && !x?.paid &&

                                    < Td >  <Badge colorScheme='red'>Expired</Badge>
                                    </Td>
                                }
                                {x?.paid &&

                                    < Td >  <Badge colorScheme='green'>Success</Badge>
                                    </Td>
                                }
                                {new Date(x?.transaction_detail?.expires_at * 1000) > date && !x?.paid &&

                                    < Td onClick={index == 0 ? () => { handleUrl(x) } : () => { }} >  <Badge colorScheme='purple'>{index == 0 ? "Click here" : "Not eligible "}</Badge>
                                    </Td>
                                }
                                {new Date(x?.transaction_detail?.expires_at * 1000) < date && !x?.paid &&

                                    < Td >  <Badge colorScheme='red'>failed</Badge>
                                    </Td>
                                }
                                {x?.paid &&

                                    < Td >  <Badge colorScheme='green'>Paid</Badge>
                                    </Td>
                                }

                            </Tr>
                        )}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

