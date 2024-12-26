import { BoxProps, Center } from "@chakra-ui/react";

type MarkProps = {
    value: number;
    isWinner?: boolean;
} & BoxProps;

export const Mark = ({ value, isWinner, ...props }: MarkProps) => (
    <Center
        {...props}
        boxSize={16}
        borderRadius="full"
        fontSize="2xl"
        fontWeight="bold"
        border="2px solid"
        bg="blackAlpha.50"
        borderColor="blackAlpha.50"
        boxShadow={isWinner ? "0px 0px 20px 0px #2BC02B" : "none"}
        _dark={{ bg: "whiteAlpha.50", borderColor: "whiteAlpha.50" }}
        children={value}
    />
);