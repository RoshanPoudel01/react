import React, { useEffect, useState } from 'react'
import apiCall from "../../helper/Axios";
import {
    Image,
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

export const AllHotels = () => {
    const [hotels, sethotels] = useState("")
    useEffect(() => {
        allHotels()
    }, [])

    const allHotels = async () => {
        const allhotels = await apiCall.get("admin/allhotels")
        sethotels(allhotels?.data?.response?.Hotels)
    }
    return (
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>All Hotels</TableCaption>
                <Thead>
                    <Tr>
                        <Th>S.N</Th>
                        <Th>Name</Th>
                        <Th>Image</Th>
                        <Th>Email</Th>
                        <Th>Address</Th>
                        <Th>Phone</Th>
                        <Th>Owner</Th>


                    </Tr>
                </Thead>
                <Tbody>
                    {
                        hotels && hotels?.map((x, index) =>

                            <Tr>
                                <Td>{index + 1}</Td>
                                <Td>{x.name}</Td>
                                <Td> <Image
                                    src={x.bannerimage}
                                    alt='{x.name}'
                                    height={200}
                                    width={250}
                                    borderRadius='lg'
                                    fallbackSrc='https://res.cloudinary.com/dnjy9jxbk/image/upload/v1683388418/Ramesh%20Dai%20Ko%20Hotel.png'
                                /></Td>
                                <Td>{x.email}</Td>
                                <Td>{x.address}</Td>
                                <Td>{x.phone}</Td>
                                <Td>{x.owner.name}</Td>

                            </Tr>
                        )}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

