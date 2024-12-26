import { AutoLinkWrapper } from "~/components/AutoLinkWrapper.tsx";
import { Text } from "@chakra-ui/react";
import { Props } from "~/pages/RoundPage/RoundArtifacts/RoundDescription/Props.ts";

export const ReadonlyDescription = ({ description }: Props) => (
    <AutoLinkWrapper>
        <Text
            whiteSpace="pre-line"
            fontSize={{ base: "sm", md: "md" }}
            lineHeight="150%"
            children={description}
        />
    </AutoLinkWrapper>
);