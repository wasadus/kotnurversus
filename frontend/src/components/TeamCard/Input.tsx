import { Input as BaseInput, forwardRef, InputProps } from "@chakra-ui/react";

export const Input = forwardRef<InputProps, "input">((props, ref) => (
    <BaseInput
        ref={ref}
        variant="flushed"
        border="none"
        _focusVisible={{ border: "none" }}
        {...props}
    />
));
