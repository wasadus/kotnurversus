import { Text } from "@chakra-ui/react";
import { ExtensionsProps } from "~/pages/TourneyPage/TourneyBracket/Match/ExtensionsProps";

export const SpecificationLabel = ({ value }: ExtensionsProps) => (
    <Text
        textAlign="center"
        noOfLines={1}
        wordBreak="break-all"
        fontSize={{ base: "sm", md: "md" }}
        color={value ? "text.light.main" : "blackAlpha.500"}
        _dark={{ color: value ? "text.dark.main" : "whiteAlpha.500" }}
        children={value || "Тема не выбрана"}
    />
);