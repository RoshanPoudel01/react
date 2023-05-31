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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

import * as Yup from "yup";
import TextInput from "../../component/TextInput";
import apiCall from "../../helper/Axios";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is Required")
    .min(2, "Too Short!")
    .max(50, "Too Long!"),
  password: Yup.string()
    .required("Password is Required")
    .min(8, "Too Short!")
    .max(50, "Too Long!"),
  email: Yup.string().email("Invalid email").required("Email is Required"),
});

export default function Signup() {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(SignupSchema),
    defaultValues: {
      name: "",
      password: "",
      email: "",
    },
  });

  const submitForm = async (data) => {
    try {
      const result = await apiCall.post("auth/signup", {
        ...data,
      });
      console.log(result?.status);
      if (result?.status === 201) {
        toast.success(result?.data?.message);
        navigate(`/login`);
      }

      // toast.error(re);
    } catch (e) {
      console.log(e?.response?.data?.message, "errr");

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
          <Heading fontSize={"4xl"}>Sign Up to your account</Heading>
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
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <TextInput name="name" control={control} />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <TextInput name="email" control={control} />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <TextInput name="password" control={control} />
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
                  Sign Up
                </Button>
              </Stack>
            </form>
          </Stack>
           <Text px={2} mx={2}>Already have an account?   <Link _hover={{
                    bg: "blue.300",
                  }} href="/login">    Login</Link></Text> 
        </Box>
      </Stack>
    </Flex>
  );
}
