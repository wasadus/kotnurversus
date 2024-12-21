import { Box, BoxProps, forwardRef } from "@chakra-ui/react";

export const TeamCardLayout = forwardRef<BoxProps, "div">(
    ({ _dark, ...props }, ref) => (
        <Box
            ref={ref}
            maxW={{ base: "175px", md: "250px" }}
            w="full"
            h="fit-content"
            bg="blackAlpha.100"
            boxShadow="base"
            borderRadius={4}
            border="1px solid"
            borderColor="blackAlpha.400"
            _dark={{
                bg: "whiteAlpha.100",
                borderColor: "whiteAlpha.400",
                ..._dark,
            }}
            {...props}
        />
    )
);