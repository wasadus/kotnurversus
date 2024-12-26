import { Button, ButtonProps, forwardRef, useColorMode } from "@chakra-ui/react";

export const ActionButton = forwardRef<ButtonProps, "button">((props, ref) => {
    const { colorMode } = useColorMode();

    return (
        <Button
            ref={ref}
            px={6}
            variant="unstyled"
            fontSize="lg"
            fontWeight="semibold"
            borderRadius="full"
            border="2px solid"
            borderColor={`text.${colorMode}.main`}
            _hover={{ color: "secondary", borderColor: "secondary" }}
            {...props}
        />
    );
});