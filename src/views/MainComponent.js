import {
  Image,
  Divider,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Text,
  ButtonGroup,
  Button,
  Flex,
  Grid,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import apiCall from "../helper/Axios";

const MainComponent = () => {
  const [dataa, setData] = useState([]);

  useEffect(() => {
    getHotels();
  }, []);

  const getHotels = async () => {
    const hotels = await apiCall.get("hotel/get-hotel");
    console.log(hotels?.data?.response)
    setData(hotels?.data?.response);
  };
  const navigate = useNavigate();
  const handleDetails = (id) => {
    console.log(id);
    navigate(`/details?hotel_id=${id}`);
  };

  // console.log(">>>>",dataa)
  return (
    <SimpleGrid columns={{ lg: 4, md: "3", sm: "1" }}>
      {dataa?.map((x, index) => (
        // console.log(x)
        <Card maxW="sm" key={index} p={5} m={3}>
          <CardBody>
            <Image
              src={x.bannerimage}
              alt="{x.name}"
              height={200}
              width={300}
              borderRadius="lg"
              fallbackSrc="https://res.cloudinary.com/dnjy9jxbk/image/upload/v1683388418/Ramesh%20Dai%20Ko%20Hotel.png"
            />
            <Stack mt="6" spacing="3">
              <Heading size="md">{x.name}</Heading>
              <Text>{x.address}</Text>
              <Text color="blue.500" fontSize="l">
                Price Per Day:${x.price}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup marginLeft={10} spacing="2">
              <Button
                variant="solid"
                colorScheme="blue"
                onClick={() => {
                  handleDetails(x._id);
                }}
              >
                View more
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default MainComponent;
