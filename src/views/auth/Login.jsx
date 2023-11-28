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
import { useEffect } from "react";

const SigninSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is Required")
    .min(8, "Too Short!")
    .max(50, "Too Long!"),
  email: Yup.string().email("Invalid email").required("Email is Required"),
});

export default function Signin() {
  const navigate = useNavigate();
  useEffect(() => {
    tokenchecker();
  }, []);
  const tokenchecker = async () => {
    const token = await localStorage.getItem("usertoken");
    const userrole = await localStorage.getItem("userrole");
    // console.log(userrole)
    if (token && userrole) {
      navigateUser(userrole);
    }
  };
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(SigninSchema),
    defaultValues: {
      password: "",
      email: "",
      role: "",
    },
  });

  const submitForm = async (data) => {
    try {
      const result = await apiCall.post("auth/login", {
        ...data,
      });
      // console.log(result);
      if (result?.status === 200) {
        toast.success(result?.data?.message);
        // console.log(result)
        // console.log(result?.data?.response?.role);
        await localStorage.setItem("usertoken", result?.data?.token);
        await localStorage.setItem("userrole", JSON.stringify(result?.data?.response?.role));
        // console.log(result?.data?.response?.role);
        navigateUser(result?.data?.response?.role);
      }

      // toast.error(re);
    } catch (e) {
      console.log(e?.response?.data?.message);

      toast.error(e?.response?.data?.message);
    }
  };
  const navigateUser = (data) => {
    console.log(data);
    if (data === "Admin") {
      navigate(`/admin`);
    } else if (data === "Client") {
      navigate(`/client-dashboard`);
    } else {
      navigate(`/`);
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
          <Heading fontSize={"4xl"}>Login to your account</Heading>
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
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <TextInput name="email" control={control} />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <TextInput name="password" type={"password"} control={control} />
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
                  Login
                </Button>
              </Stack>
            </form>
          </Stack>
          <Text px={2} mx={2}>Don't have an account?   <Link _hover={{
            bg: "blue.300",
          }} href="/signup">    SignUp</Link></Text>
        </Box>
      </Stack>
    </Flex>
  );
}
