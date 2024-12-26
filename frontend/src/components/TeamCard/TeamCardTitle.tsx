import { BoxProps, Flex } from "@chakra-ui/react";

export const TeamCardTitle = (props: BoxProps) => (
    <Flex
        px={{ base: 2, md: 4 }}
        h={{ base: "32px", md: "42px" }}
        align="center"
        {...props}
    />
);