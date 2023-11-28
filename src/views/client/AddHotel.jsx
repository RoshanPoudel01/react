import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CloseButton,
  Flex,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import DropzoneComponent from "../../component/Dropzone";
import toast, { Toaster } from "react-hot-toast";

import slugify from "react-slugify";
import apiCall from "../../helper/Axios";
import TextInput from "../../component/TextInput";
import SelectOpt from "../../component/Select";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useSearchParams } from "react-router-dom";
const AddHotelSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid email").required("Email is Required"),
  phone: Yup.number().required("Phone is Required"),
  address: Yup.string().required("Address is Required"),
  price: Yup.string().required("Price is Required"),
  description: Yup.string().required("Description is Required"),
  bannerimage: Yup.mixed().required("You need to provide a Image")

});

const AddHotel = () => {
  const navigate = useNavigate()
  const [opt, setOpt] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("hotel_id")
  const [hotel, setHotel] = useState("")
  const [features, setFeatures] = useState("")
  const [bannerImage, SetBannerImage] = useState(null);
  const [editImage, SetEditImage] = useState(false);
  useEffect(() => {
    getFeatures();
    if (id) {
      getHotelDetails()
    }
  }, []);

  const getHotelDetails = async () => {

    const result = await apiCall.get(`hotel/hotel-details?id=${id}`);
    console.log(result?.data?.response?.feature?.map((feature) => feature.name))
    //check hotel response
    setHotel(result?.data?.response)
    let objFeature = {}
    const mapdata = result?.data?.response?.feature?.map((data) => {
      objFeature = { ...objFeature, value: data?._id, label: data?.name[0] }
      return objFeature
    })
    console.log(mapdata)

    setFeatures(mapdata)
  }

  const getFeatures = async () => {
    const features = await apiCall.get("feature/get-feature");
    const dataOption = features?.data?.response.map((data) => {
      return { label: data?.name[0], value: data?._id }
    })
    // console.log(dataOption)
    console.log(dataOption)
    setOpt(dataOption)
    // console.log(features?.data?.response.map((feature) => feature._id));


    // console.log(features?.data?.response);
  };

  //fetch http://localhost:9000/api/feature/get-feature api
  // get response  array
  // map and get id and name as label value and set in option
  const { control, reset, handleSubmit, watch } = useForm({
    resolver: yupResolver(AddHotelSchema),

  });
  useEffect(() => {
    const defaultValue = {
      name: hotel?.name ?? "",
      email: hotel?.email ?? "",
      phone: hotel?.phone ?? "",
      address: hotel?.address ?? "",
      price: hotel?.price ?? "",
      description: hotel?.description ?? "",
      bannerimage: hotel?.bannerimage ?? "",
      features: features ?? ""
    }
    reset(defaultValue)

  }, [hotel, reset, features])

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
    console.log(data)
    console.log(bannerImage)
    try {
      if (id) {
        const result = await apiCall.post(`hotel/hotel-edit?id=${id}`, {
          ...data,
          feature: data?.features?.map((feature) => feature.value),
          subtitle: slugify(data?.name),
          bannerimage: bannerImage ? "data:" + bannerImage[0].type + ";base64," + await fileToBase64(bannerImage[0]) : data?.bannerimage
        });
        console.log(result?.data?.response)
        navigate("/hotel-list", { state: { message: "Hotel Updated Successfully" } });
      } else {
        const result = await apiCall.post("hotel/add-hotel", {
          ...data,
          feature: data?.features?.map((feature) => feature.value),
          bannerimage: "data:" + bannerImage[0].type + ";base64," + await fileToBase64(bannerImage[0]),
          subtitle: slugify(data?.name),
        });
        navigate("/hotel-list", { state: { message: "Hotel Added Successfully" } });



      }
      // toast.error(re);
    } catch (e) {
      // console.log(e?.response)
      console.log("a")
      toast.error(e?.response?.data?.message);
    }
  };
  return (
    <Card >
      <Toaster position="top-right" reverseOrder={false} />
      {/* {console.log(hotel?.bannerimage)} */}
      <form onSubmit={handleSubmit(submitForm)}>
        <SimpleGrid columns={{ sm: 1, md: 1, lg: 2 }} spacing={{ lg: "40px" }}>
          <TextInput name="name" control={control} label="Hotel Name" />
          {id &&
            <TextInput name="email" control={control} label="Hotel Email " disabled />
          }
          {!id &&
            <TextInput name="email" control={control} label="Hotel Email " />
          }
          <TextInput name="phone" control={control} label="Phone Number" />
          <TextInput name="address" control={control} label="Address" />
          <TextInput name="price" control={control} label="Price Per Day" />

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
        {hotel?.bannerimage && !editImage ?
          <Flex>
            <Image src={hotel?.bannerimage} alt='Dan Abramov' width="90px"
              height="90px"
              objectFit="cover" />
            <CloseButton
              onClick={(e) => {
                SetEditImage(true)
              }}
              alignSelf="flex-start"
            />

          </Flex>
          : <DropzoneComponent
            setAcceptedFiles={SetBannerImage}
            helperText="Please Upload Image Files(.png .jpg .jpeg)"
            title="My Hotel Image"
          // showImage={hotel?.bannerimage ? hotel?.bannerimage : ""}
          />}


        {!id &&
          <Button mt={4} onSubmit={handleSubmit} colorScheme="teal" type="submit">
            Add Hotel
          </Button>
        }
        {id &&
          < Button mt={4} onSubmit={handleSubmit} colorScheme="teal" type="submit">
            Update Hotel
          </Button>
        }



      </form>
    </Card>
  );
};

export default AddHotel;
