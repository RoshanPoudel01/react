import React, { useEffect, useState } from 'react'
import apiCall from "../../helper/Axios";
import { Button } from '@chakra-ui/react';

const BecomeClient = () => {
    const [url, seturl] = useState()
    useEffect(() => {
        makeclient()
    }, [])
    // / make - client
    const makeclient = async () => {
        const payment = await apiCall.get("auth/makeclient")
        console.log(payment?.data?.response?.Link?.url)
        // seturl(payment?.data?.response?.Link?.url)
        window.open(payment?.data?.response?.Link?.url, "_self")


    }

    const handleSubmit = () => {
        window.open(url)
    }
    return (
        <Button mt={4} onSubmit={handleSubmit} colorScheme="teal" type="submit">
            Become Client
        </Button>
    )
}

export default BecomeClient