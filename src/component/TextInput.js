
import {
  Badge,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Controller } from "react-hook-form";

const TextInput = ({
  name,
  control,
  label,
  type,
  helperText,
  isRequired,
  startIcon,
  disabled,
  endIcons,
  disbleEndIcons,
  onIconClick,
  variant,
  maxLengthInput,
  noFloating,
  isButtonIcon,
  background,
  isUpperCase,
  ...extraProps
}) => {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const inputBg = useColorModeValue("secondaryGray.300", "navy.900");
  const inputText = useColorModeValue("gray.700", "gray.100");
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <>
            <FormControl
              variant={noFloating ? "default" : "floating"}
              id={name}
              isRequired={!!isRequired}
              isInvalid={!!error}
              marginBottom={3}
            >
              {!noFloating && (
                <FormLabel
                  fontSize="sm"
                  ms="10px"
                  display="flex"
                  color={textColorPrimary}
                  fontWeight="bold"
                  _hover={{ cursor: "pointer" }}
                >
                  {label}
                </FormLabel>
              )}

              <InputGroup height={type !== "textarea" ? "46px" : "auto"}>
                {startIcon ? (
                  <InputLeftElement
                    top="12%"
                    pointerEvents="none"
                    onClick={onIconClick}
                  >
                    {startIcon}
                  </InputLeftElement>
                ) : (
                  ""
                )}
                {type === "textarea" ? (
                  <Textarea
                    paddingLeft={startIcon ? 9 : ""}
                    placeholder=" "
                    height={"inherit"}
                    onChange={onChange}
                    value={value ?? ""}
                    isInvalid={!!error}
                    errorBorderColor={"red.500"}
                    boxShadow="inset 0px 1px 1px rgba(0, 0, 0, 0.12)"
                    disabled={disabled}
                    variant={variant}
                    {...extraProps}
                  />
                ) : (
                  <Input
                    paddingLeft={startIcon ? 9 : ""}
                    paddingRight={endIcons ? 9 : ""}
                    placeholder={noFloating ? label : " "}
                    type={type}
                    h="44px"
                    maxh="44px"
                    _placeholder={{
                      fontWeight: "400",
                      color: "secondaryGray.600",
                    }}
                    onChange={onChange}
                    bg={background ? background : inputBg}
                    value={isUpperCase ? value?.toUpperCase() : value ?? ""}
                    isInvalid={!!error}
                    fontWeight="500"
                    errorBorderColor={"red.500"}
                    disabled={disabled}
                    color={inputText}
                    maxLength={maxLengthInput ? maxLengthInput : 50}
                    variant={variant ? variant : "outline"}
                    {...extraProps}
                  />
                )}

                {endIcons ? (
                  <InputRightElement
                    top="1%"
                    width={isButtonIcon ? "4.5rem" : "unset"}
                    right="28px"
                  >
                    {isButtonIcon ? (
                      <Badge
                        ml="1"
                        fontSize="0.8em"
                        colorScheme="green"
                        size="sm"
                        onClick={disbleEndIcons ? () => {} : onIconClick}
                        cursor={"pointer"}
                      >
                        {endIcons}
                      </Badge>
                    ) : (
                      endIcons
                    )}
                  </InputRightElement>
                ) : (
                  ""
                )}
              </InputGroup>
              <FormErrorMessage color={"red"}>{error ? error?.message : ""}</FormErrorMessage>
              {helperText ? <FormHelperText>{helperText}</FormHelperText> : ""}
            </FormControl>
          </>
        );
      }}
    />
  );
};
export default TextInput;
