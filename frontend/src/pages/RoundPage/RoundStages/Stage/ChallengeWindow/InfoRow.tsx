import { BoxProps, Stack, Text } from "@chakra-ui/react";

type InfoRowProps = {
    name: string;
} & BoxProps;

export const InfoRow = ({ name, children, ...props }: InfoRowProps) => (
    <Stack {...props}>
        <Text
            opacity={0.75}
            fontSize={{ base: "xs", md: "sm" }}
            fontWeight="medium"
            children={name}
        />
        <Text
            fontSize={{ base: "md", md: "lg" }}
            whiteSpace="pre-line"
            children={children}
        />
    </Stack>
);