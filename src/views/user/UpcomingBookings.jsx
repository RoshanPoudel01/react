import React, { useEffect, useState } from 'react'
import apiCall from "../../helper/Axios";
import { Box, Card, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import ArticleCard from '../../component/Card';


export const UpcomingBookings = () => {
    const [upcomingbookings, setupcomingbookings] = useState([])
    useEffect(() => {
        getUpcomingBookings()
    }, [])

    const getUpcomingBookings = async () => {
        const comingbookings = await apiCall.get("booking/upcomingbookings")
        if (comingbookings?.data?.response?.Bookings) {
            setupcomingbookings(comingbookings?.data?.response?.Bookings)
        }
    }
    // console.log(upcomingbookings)
    return (
        <Flex justify={{ "sm": "center", "md": "space-between", "lg": "space-between" }}>
            {upcomingbookings && upcomingbookings?.length > 0 ?
                <SimpleGrid columns={{ sm: 1, md: 3, lg: 4 }} spacing={5}
                >
                    {upcomingbookings?.map((data) => {
                        console.log(data)
                        return (

                            //  <ArticleCard key={data?._id} title={data?.Hotel?.name} primaryText={"View More"} image={"http://res.cloudinary.com/dnjy9jxbk/image/upload/v1684520706/Hotel%20Himalaya%20View.jpg"} KeyValue={upcomingbookings} />
                            <ArticleCard key={data?._id} title={data?.Hotel?.name} primaryText={"View More"} secondaryText={"Cancel Booking"} image={"http://res.cloudinary.com/dnjy9jxbk/image/upload/v1684520706/Hotel%20Himalaya%20View.jpg"} date={data?.check_in_date} />

                        )
                    })}

                </SimpleGrid>
                :
                <Text>No booking found</Text>
            }

        </Flex>
    )
}

