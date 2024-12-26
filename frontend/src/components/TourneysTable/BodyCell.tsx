import { Text, TextProps } from "@chakra-ui/react";

export const BodyCell = (props: TextProps) => (
    <Text
        px={{ base: 2, md: 8 }}
        noOfLines={{ base: 2, md: 1 }}
        wordBreak={{ base: "break-word", md: "break-all" }}
        {...props}
    />
);