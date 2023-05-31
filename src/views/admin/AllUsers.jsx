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

export const AllUsers = () => {
    const [users, setusers] = useState("")
    useEffect(() => {
        allusers()
    }, [])

    const allusers = async () => {
        const users = await apiCall.get("admin/allusers")
        setusers(users?.data?.response?.Users)
        console.log(users)
    }

    return (
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>All Users</TableCaption>
                <Thead>
                    <Tr>
                        <Th>S.N</Th>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Role</Th>


                    </Tr>
                </Thead>
                <Tbody>
                    {
                        users && users?.map((x, index) =>

                            <Tr>
                                <Td>{index + 1}</Td>
                                <Td>{x.name}</Td>
                                <Td>{x.email}</Td>
                                <Td>{x.role}</Td>

                            </Tr>
                        )}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

