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

import * as Yup from "yup";
import TextInput from "../../component/TextInput";
import apiCall from "../../helper/Axios";

const BookingValidations = Yup.object().shape({
  check_in_date: Yup.string().required("Check In Date is Required"),
  check_out_date: Yup.string().required("Check Out Date is Required"),
});

export default function Booking() {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(BookingValidations),
    defaultValues: {
      chek_in_date: "",
      check_out_date: "",
      hotel_id: "",
    },
  });

  const submitForm = async (data) => {
    try {
      const result = await apiCall.post("booking/book-hotel", {
        ...data,
      });
      console.log(result);
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
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Toaster position="top-right" reverseOrder={false} />
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
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
              <FormControl id="check_in_date" isRequired>
                <FormLabel>Check In Date</FormLabel>
                <TextInput name="check_in_date" control={control} />
              </FormControl>
              <FormControl id="check_out_date" isRequired>
                <FormLabel>Check Out Date</FormLabel>
                <TextInput name="check_out_date" control={control} />
              </FormControl>
              <FormControl id="hotel_id" isRequired>
                <FormLabel>Hotel Id</FormLabel>
                <TextInput name="hotel_id" control={control} />
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
