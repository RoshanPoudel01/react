// import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  CloseButton,
  Flex,
  GridItem,
  Heading,
  IconButton,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
// import { MdOutlineDocumentScanner } from "react-icons/md";
// import { AiOutlineInfoCircle } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function DropzoneComponent({
  setAcceptedFiles,
  multiple,
  helperText,
  maxSize,
  showImage,
  title,
  showIcon,
  subTitle,
}) {
  const [preview, setPreview] = useState([]);
  const [rejectedFileList, setRejectedFileList] = useState([]);
  const singleUpload = !multiple && preview.length > 0;
  const textColorBrand = useColorModeValue("brand.500", "white");

  useEffect(() => {
    if (showImage) {
      setPreview([{ link: showImage }]);
    }
  }, [showImage]);
  return (
    <Dropzone
      onDrop={(acceptedFiles, rejectedFiles) => {
        setAcceptedFiles(acceptedFiles);
        setRejectedFileList(rejectedFiles);

        acceptedFiles.forEach((file) => {
          const filePreview = {
            link: URL.createObjectURL(file),
            fileType: file.type,
            fileName: file.name,
          };
          multiple
            ? setPreview((prev) => [...prev, filePreview])
            : setPreview([filePreview]);
        });
      }}
      maxSize={maxSize ?? 5242880}
      multiple={!!multiple}
      disabled={showImage ? true : false}
    >
      {({ getRootProps, getInputProps }) => (
        <section>
          <Flex justify={"space-between"} align={"center"} mb={1}>
            {title && (
              <Text fontWeight={"bold"} mx="auto">
                {title}
              </Text>
            )}
          </Flex>
          {subTitle && <Text my={1}>{subTitle}</Text>}
          <Box {...getRootProps()} border="2px dashed #D1D5DB">
            <input {...getInputProps()} />
            <VStack spacing={4}>
              {singleUpload ? (
                <>
                  {showImage ? (
                    ""
                  ) : (
                    <CloseButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreview([]);
                        setAcceptedFiles([]);
                      }}
                      alignSelf="flex-end"
                    />
                  )}

                  <Image
                    my={showImage ? 3 : ""}
                    src={preview[0].link}
                    width="90px"
                    height="90px"
                    objectFit="cover"
                    // fallbackSrc={Logo}
                  />

                  <Text flex={1} noOfLines={[1]}>
                    {preview[0].fileName}
                  </Text>
                </>
              ) : (
                <>
                  {/* <ImagePlaceholder /> */}
                  <Heading
                    fontSize={"14px"}
                    display="flex"
                    justifyContent={"center"}
                    gap={1}
                    padding={10}
                  >
                    <Text color="#14B8A6" display={"inline-block"}>
                      Upload {multiple ? "files" : "a file"},
                    </Text>
                    or click to select files
                  </Heading>
                  <Text color="gray.400">{helperText}</Text>
                </>
              )}
            </VStack>
          </Box>
          {(preview.length > 1 || rejectedFileList.length > 1) && (
            <Button
              mt={4}
              leftIcon={<AiOutlineCloseCircle width={3} height={3} />}
              colorScheme="purple"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                setPreview([]);
                setRejectedFileList([]);
              }}
            >
              Remove All
            </Button>
          )}

          <SimpleGrid columns={1} spacing={2} mt={multiple ? 2 : 0}>
            {rejectedFileList.map((rejectedItem, index) => {
              return (
                <GridItem key={index}>
                  <Alert status="error">
                    <AlertIcon />
                    <Text as="b" mr={2}>
                      {rejectedItem.file.name}{" "}
                    </Text>
                    <Text mr={2}>File not uploaded</Text>
                    <Text flex={1}>
                      {rejectedItem.errors[0].code == "file-too-large"
                        ? `File is large than ${
                            maxSize ? maxSize * 0.000001 + " MB" : "5MB"
                          }`
                        : rejectedItem.errors[0].message}
                    </Text>
                    <CloseButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setRejectedFileList((prev) => {
                          return prev.filter((each, i) => i !== index);
                        });
                      }}
                      justifySelf="flex-end"
                    />
                  </Alert>
                </GridItem>
              );
            })}
          </SimpleGrid>
        </section>
      )}
    </Dropzone>
  );
}
