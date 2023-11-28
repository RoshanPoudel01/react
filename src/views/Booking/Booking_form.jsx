import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import TextInput from "../../component/TextInput";
import apiCall from "../../helper/Axios";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import dayjs from 'dayjs';

const BookingValidations = Yup.object().shape({
  check_in_date: Yup.string().required("Check In Date is Required"),
  check_out_date: Yup.string().required("Check Out Date is Required"),
});


export default function Booking({ id }) {
  const [check_in_date, setStartDate] = useState(new Date());
  console.log("CHECK=>" + check_in_date)
  const [check_out_date, setEndDate] = useState(new Date());
  const navigate = useNavigate();
  const handleCheckinChange = (value, e) => {
    setStartDate(value);
    console.log(value); // this will be a moment date object
    // console.log(e.target.value); // this will be a string value in datepicker input field
  }
  const handleCheckoutChange = (value, e) => {
    setEndDate(value);
    console.log(value); // this will be a moment date object
    // console.log(e.target.value); // this will be a string value in datepicker input field
  }

  const { control, handleSubmit } = useForm({
    // resolver: yupResolver(BookingValidations),
    defaultValues: {
      check_in_date: "",
      check_out_date: "",
    },
  });

  const submitForm = async (data) => {
    try {
      console.log("asdnahlsjdhla;skdhnklajsdh")
      console.log(dayjs(check_in_date).format('YYYY-MM-DD'))
      console.log(check_out_date)
      const result = await apiCall.post("booking/book-hotel", {
        check_in_date: dayjs(check_in_date).format('YYYY-MM-DD'), check_out_date: dayjs(check_out_date).format('YYYY-MM-DD'), hotel_id: id,
      });
      // console.log(result?.data?.response?.session);
      const stripe = await loadStripe(`${process.env.REACT_APP_PUBLIC_KEY}`);
      stripe.redirectToCheckout({ sessionId: result?.data?.response?.session });
      //   if (result?.status === 200) {
      //     toast.success(result?.data?.message);
      //     console.log(result?.data?.response?.role);
      //     // console.log(Response.role);
      //     if (result?.data?.response?.role === "Admin") {
      //       navigate(`/admin`);
      //     } else {
      //       navigate(`/`);
      //     }
      //above console lai local storage
      // user role check
      // admin and normal redirect
      //   }
      //   console.log(data);
      // toast.error(re);
    } catch (e) {
      console.log(e?.response?.data?.message);

      toast.error(e?.response?.data?.message);
    }
  };

  return (
    <Flex

      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Toaster position="top-right" reverseOrder={false} />
      <Stack spacing={8} mx={"auto"} maxW={"md"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Book Hotel</Heading>
          {/* <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            </Text> */}
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(submitForm)}>
              {/* <FormControl id="check_in_date" isRequired>
                <FormLabel>Check In Date</FormLabel>
                <TextInput name="check_in_date" control={control} />
              </FormControl>
              <FormControl id="check_out_date" isRequired>
                <FormLabel>Check Out Date</FormLabel>
                <TextInput name="check_out_date" control={control} />
              </FormControl> */}
              <FormControl id="check_in_date" isRequired>
                <FormLabel>Check In Date</FormLabel>
                <DatePicker control={control} selected={check_in_date} minDate={check_in_date} onChange={(value, e) => handleCheckinChange(value, e)} onKeyDown={(e) => {
                  e.preventDefault();
                }} />
              </FormControl>
              <FormControl id="check_out_date" isRequired>
                <FormLabel>Check Out Date</FormLabel>
                <DatePicker control={control} selected={check_out_date} minDate={check_in_date} onChange={(value, e) => handleCheckoutChange(value, e)} onKeyDown={(e) => {
                  e.preventDefault();
                }} />
              </FormControl>

              <Stack spacing={10}>
                <Button
                  bg={"blue.400"}
                  type="submit"
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Book
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
