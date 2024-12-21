import { Center } from "@chakra-ui/react";
import { ExtensionsProps } from "~/pages/TourneyPage/TourneyBracket/Match/ExtensionsProps";

export const Badge = ({ value }: ExtensionsProps) => (
    <Center
        ml={-3}
        mt={-3}
        boxSize={6}
        bg="teal.100"
        fontSize="sm"
        lineHeight="0px"
        border="2px solid"
        borderColor="teal.300"
        _dark={{ bg: "teal.800", borderColor: "teal.200" }}
        borderRadius="full"
        children={value}
    />
);
