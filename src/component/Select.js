import {
  Alert,
  AlertIcon,
  Box,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  useColorModeValue,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
// import { selectStyles } from "./selectStyles";

function Select({
  size = "sm",
  control,
  name,
  isMulti,
  helperText,
  isSearchable,
  label,
  marginBottom,
  ...args
}) {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  return (
    <Box w={"100%"}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <FormControl
              variant="floating"
              id={name}
              isInvalid={!!error}
              marginBottom={marginBottom ? marginBottom : 5}
            >
              {label && (
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
              <ReactSelect
                isSearchable={isSearchable ?? true}
                closeMenuOnSelect={!isMulti}
                {...field}
                // styles={{
                //   ...selectStyles,
                // }}
                size={size}
                isMulti={isMulti}
                {...args}
              />
              <FormErrorMessage>{error ? error?.message : ""}</FormErrorMessage>
              {helperText ? (
                <FormHelperText>
                  <Alert status="warning">
                    <AlertIcon />
                    {helperText}
                  </Alert>
                </FormHelperText>
              ) : (
                ""
              )}
            </FormControl>
          </>
        )}
      />
    </Box>
  );
}

export default Select;
