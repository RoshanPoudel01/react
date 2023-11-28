import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    SimpleGrid,
} from "@chakra-ui/react";
import DropzoneComponent from "../../component/Dropzone";


import apiCall from "../../helper/Axios";
import TextInput from "../../component/TextInput";
import SelectOpt from "../../component/Select";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useSearchParams } from "react-router-dom";
const AddHotelSchema = Yup.object().shape({});

export const EditHotel = () => {
    const [opt, setOpt] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const id = searchParams.get("hotel_id")
    // console.log(id)
    const [hotel, setHotel] = useState("")
    const [features, setFeatures] = useState("")

    const { control, reset, handleSubmit } = useForm({
        resolver: yupResolver(AddHotelSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
            price: "",
            description: "",
            features: ""
        },
    });

    useEffect(() => {
        getFeatures();
        if (id) {
            getHotelDetails()
        }

    }, []);
    useEffect(() => {

        reset({
            name: hotel?.name,
            email: hotel?.email,
            phone: hotel?.phone,
            address: hotel?.address,
            price: hotel?.price,
            description: hotel?.description,
            features: features

        })
    }, [hotel])

    const getHotelDetails = async () => {

        const result = await apiCall.get(`hotel/hotel-details?id=${id}`);
        console.log(result?.data?.response?.feature?.map((feature) => feature.name))
        //check hotel response
        setHotel(result?.data?.response)
        setFeatures(result?.data?.response?.feature?.map((feature) => feature.name))
    }

    const getFeatures = async () => {
        const features = await apiCall.get("feature/get-feature");
        const dataOption = features?.data?.response.map((data) => {
            return { label: data?.name[0], value: data?._id }
        })
        // console.log(dataOption)
        setOpt(dataOption)
        // console.log(features?.data?.response.map((feature) => feature._id));
    };
    const [bannerImage, SetBannerImage] = useState(null);



    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete the hotel?")) {
            const deleteHotel = await apiCall.delete(`hotel/delete?id=${id}`)
            navigate('/hotel-list')
        }
    }
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
            const result = await apiCall.post(`hotel/hotel-edit?id=${id}`, {
                ...data,
                bannerimage: "data:" + bannerImage[0].type + ";base64," + base64String,

            });
            // console.log(result);

            // toast.error(re);
        } catch (e) {
            // console.log(e?.response?.data?.message);

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
                <Button mt={4} colorScheme="teal" type="submit">
                    Update Hotel
                </Button>
            </form>
            <Button mt={4} onClick={handleDelete} colorScheme="red" type="submit">
                Delete Hotel
            </Button>
        </Card>
    )
}

export default EditHotel