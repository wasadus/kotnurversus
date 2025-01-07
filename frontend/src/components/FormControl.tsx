import {
  FormControl as ChakraFormControl,
  FormControlProps as ChakraFormControlProps,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import { forwardRef } from "react";

export type FormControlProps = {
  label?: string;
  errorMessage?: string;
  requirements?: string;
} & ChakraFormControlProps;

export const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
  ({ label, errorMessage, requirements, children, ...props }, ref) => (
    <ChakraFormControl ref={ref} isInvalid={Boolean(errorMessage)} {...props}>
      {label && (
        <FormLabel
          mb={2}
          fontSize="md"
          noOfLines={1}
          wordBreak="break-all"
          children={label}
        />
      )}
      {children}
      {!errorMessage && (
          <FormHelperText
              mx={1}
              mt={2}
              color="grey.500"
              _dark={{ color: "grey.300" }}
              fontSize="xs"
              children={requirements}
          />
      )}
      {errorMessage && (
        <FormHelperText
          mx={1}
          mt={2}
          color="red.500"
          _dark={{ color: "red.300" }}
          fontSize="xs"
          children={errorMessage}
        />
      )}
    </ChakraFormControl>
  )
);
