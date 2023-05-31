import { Spinner } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import apiCall from "../../helper/Axios";
import { useNavigate } from 'react-router';


export const Callback = () => {
    useEffect(() => {
        getAccountStatus()
    }, [])
    const navigate = useNavigate()

    const getAccountStatus = async () => {
        const accountstatus = await apiCall.get("auth/get-account-status")
        console.log(accountstatus?.data)
        if (accountstatus?.data?.response?.isClient) {
            navigate("/client-dashboard")
        }
    }
    return (
        <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
        />
    )
}

