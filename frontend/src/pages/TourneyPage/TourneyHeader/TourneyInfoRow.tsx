import { ReactNode } from "react";
import { Text, useColorMode } from "@chakra-ui/react";

type TourneyInfoRowProps = {
    name: string;
    children: ReactNode;
};

export const TourneyInfoRow = ({ name, children }: TourneyInfoRowProps) => {
    const { colorMode } = useColorMode();

    return (
        <Text
            fontSize={{ base: "sm", md: "md" }}
            whiteSpace="pre-line"
            wordBreak="break-word"
        >
            <Text as="span" color={`text.${colorMode}.extra.1`}>
                {name}:
            </Text>{" "}
            {children}
        </Text>
    );
};