import { useEffect, useState } from "react";
import apiCall from "../../helper/Axios";
import TextInput from "../../component/TextInput";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";

import {
  Badge,
  Box,
  Button,
  Card,
  Center,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { yupResolver } from "@hookform/resolvers/yup";



const PasswordChangeSchema = Yup.object().shape({
  currentpassword: Yup.string()
    .required("Password is Required")
   ,
  newpassword: Yup.string()
    .required("Password is Required")
    ,
  confirmnewpassword: Yup.string().required("Password is Required"),
});
export default function Profile() {
  const navigate = useNavigate();

    useEffect(() => {
     
      
    }, [])
    
      const { control, handleSubmit } = useForm({
    resolver: yupResolver(PasswordChangeSchema),
    defaultValues: {
      currentpassword: "",
      newpassword: "",
      confirmnewpassword: "",
     
    },
      });
    
    
   const submitForm = async (data) => {
       try {
           console.log("formResult?.status");
           const formResult =await apiCall.post("/auth/change-password", {
               ...data,
           });
           console.log(formResult?.status)
           if (formResult?.status === 200) {
               navigate(`/profile`)
           }
           
     }
      
     catch (e) {
 console.log(e?.response?.data?.message)
                toast.error(e?.response?.data?.message);

   
    }
  };
    useEffect(() => {
      getUserProfile();
    }, []);
  const [user, setUser] = useState("")
  const getUserProfile = async () => {
    const profile = await apiCall.get("profile/profile");
    const user = profile?.data?.response?.User;
    setUser(user)

  }
    return (
      <Flex justifyContent="center"
      alignItems="center"
            height="100vh">
      <Toaster position="top-right" reverseOrder={false} />
            
              <Box>
     <Card py={6}>
      <Flex
        borderWidth="1px"
        borderRadius="lg"
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
              padding={20}>
              
              <form onSubmit={handleSubmit(submitForm)}>
                          <TextInput name="currentpassword" control={control} label="Current Password"/>
                          <TextInput name="newpassword" control={control} label="New Password"/>
                         <TextInput name="confirmnewpassword" control={control} label="ReEnter New Password" />
                  <Button type="submit"> 
                      Change Password
                  </Button>
            </form>

        </Flex>
                </Card>
                </Box>
      </Flex>
  );
}

