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
    Badge,
} from '@chakra-ui/react'

export const AllPayments = () => {
    const [payments, setpayments] = useState("")
    const [date, setdate] = useState(new Date())

    useEffect(() => {
        allpayments()

    }, [])

    const allpayments = async () => {
        const payment = await apiCall.get("admin/allpayments")
        setpayments(payment?.data?.response?.Payments)
        console.log(payment?.data?.response)
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

                    </Tr>
                </Thead>
                <Tbody>
                    {
                        payments && payments?.map((x, index) =>

                            <Tr>
                                {console.log(x?.Hotel?.name)}
                                <Td>{index + 1}</Td>
                                <Td>{x?.Hotel?.name}</Td>
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


                            </Tr>
                        )}
                </Tbody>
            </Table>
        </TableContainer>
    )
}
