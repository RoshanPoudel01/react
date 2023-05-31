import React from 'react';
import { Card, CardBody, Stack, Heading, Image, Text, Link, CardFooter, ButtonGroup, Button, Flex } from '@chakra-ui/react';
// import articleImage from '../images/chakra-image.png';

const ArticleCard = (
    {title,desc,image,primaryText,secondaryText,KeyValue,date}
) => {
  console.log(KeyValue)
  return (
    <Card maxW="sm" bg="whiteblue.background" color="whiteblue.color" borderRadius={"13px"}>
          <CardBody>
         {image&&image&& 
        <Image src={image} borderRadius="2px 2px 0 0" />}

        <Stack mt="6"  >
          <Flex>
          <Heading
            as="u"
            textUnderlineOffset={3}
            color="#292F2E"
            fontWeight={800}
            fontSize="lg"
            lineHeight="tall"
          >
            {title}
            </Heading>
            </Flex>
          {
            desc&&desc&&
            <Text fontSize="sm" lineHeight="taller" color="#949796">
                 {desc}
          </Text>
         }
            {
            KeyValue && KeyValue?.length > 0 && KeyValue?.map((data) => {
              console.log(data)
              return (
              <Flex key={data?._id}>
                <Text fontSize="sm" lineHeight="taller" color="#949796">
                 {"Price"}
                </Text>
                   <Text fontSize="sm" lineHeight="taller" color="#949796">
                 {data?.amount}
           </Text>
            </Flex>
            )
            })
            
          //   <Text fontSize="sm" lineHeight="taller" color="#949796">
          //        {KeyValue}
          // </Text>
          }
          {date&&date&&
           <Flex>
                <Text fontSize="sm" lineHeight="taller" color="#949796">
                 {"Check in date:"}
                </Text>
                   <Text fontSize="sm" lineHeight="taller" color="#949796">
                 {date}
           </Text>
            </Flex>
          }
        </Stack>
          </CardBody>
          <CardFooter justifyContent={"space-between"}>
    {/* <ButtonGroup spacing='2'> */}
     {primaryText&& <Button variant='primary' >
       { primaryText}
              </Button>}
              
      {secondaryText&&<Button variant='secondary' >
        {secondaryText}
      </Button>}
    {/* </ButtonGroup> */}
  </CardFooter>
    </Card>
  );
};

export default ArticleCard;
