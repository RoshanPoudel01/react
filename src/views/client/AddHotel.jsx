import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Select,
  Card,
  SimpleGrid,
} from "@chakra-ui/react";
import DropzoneComponent from "../../component/Dropzone";
import SelectComponent from "../../component/Select";
import toast, { Toaster } from "react-hot-toast";
import slugify from "react-slugify";
import apiCall from "../../helper/Axios";
import TextInput from "../../component/TextInput";
import SelectOpt from "../../component/Select";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const AddHotelSchema = Yup.object().shape({});

const AddHotel = () => {
  const [opt, setOpt] = useState([])
  useEffect(() => {
    getFeatures();
  }, []);

  const getFeatures = async () => {
    const features = await apiCall.get("feature/get-feature");
   const dataOption= features?.data?.response.map((data) => {
      return{label:data?.name[0],value:data?._id}
   })
    // console.log(dataOption)
    setOpt(dataOption)
    // console.log(features?.data?.response.map((feature) => feature._id));
  

    // console.log(features?.data?.response);
  };
  const [bannerImage, SetBannerImage] = useState(null);

  //fetch http://localhost:9000/api/feature/get-feature api
  // get response  array
  // map and get id and name as label value and set in option
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(AddHotelSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      subtitle: "",
      price: "",
      description: "",
    },
  });
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result.split(",")[1]);
      };

      reader.onerror = (error) => reject(error);
    });
  }

  const submitForm = async (data) => {
    try {
      const base64String = await fileToBase64(bannerImage[0]);
      console.log("data:" + data?.name);
      const result = await apiCall.post("hotel/add-hotel", {
        ...data,
        bannerimage: "data:" + bannerImage[0].type + ";base64," + base64String,
        subtitle: slugify(data?.name),
      });
      console.log(result);

      // toast.error(re);
    } catch (e) {
      console.log(e?.response?.data?.message);

      //   toast.error(e?.response?.data?.message);
    }
  };
  return (
    <Card>
      <form onSubmit={handleSubmit(submitForm)}>
        <SimpleGrid columns={{ sm: 1, md: 1, lg: 2 }} spacing={{ lg: "40px" }}>
          <TextInput name="name" control={control} label="Hotel Name" />
          <TextInput name="email" control={control} label="Hotel Email " />
          <TextInput name="phone" control={control} label="Phone Number" />
          <TextInput name="address" control={control} label="Address" />
          <TextInput name="price" control={control} label="Price Per Day" />
          {  console.log(opt)
}
          {opt?.length > 0 &&
            <SelectOpt name="features" options={opt || []} isMulti control={control} label="Features" />}
        </SimpleGrid>
        <SimpleGrid columns={1}>
          <TextInput
            name="description"
            control={control}
            label="Description"
            type={"textarea"}
          />
        </SimpleGrid>

        <DropzoneComponent
          setAcceptedFiles={SetBannerImage}
          helperText="Please Upload XLSX Files"
          title="myt imagffe"
        />
        <Button mt={4} onSubmit={handleSubmit} colorScheme="teal" type="submit">
          Add Hotel
        </Button>
      </form>
    </Card>
  );
};

export default AddHotel;
