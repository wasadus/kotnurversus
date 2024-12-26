import { RoundArtifact } from "~/types/round.ts";
import { Image, Stack, Text, useBoolean } from "@chakra-ui/react";
import { NotAllowedIcon } from "~/icons/NotAllowedIcon.tsx";

type ArtifactItemProps = {
    artifact: RoundArtifact;
};

export const ArtifactItem = ({ artifact }: ArtifactItemProps) => {
    const [isError, setIsError] = useBoolean(false);

    if (isError) {
        return (
            <Stack
                h="75vh"
                align="center"
                justify="center"
                spacing={10}
                userSelect="none"
            >
                <NotAllowedIcon boxSize={20} />
                <Text fontSize="2xl" lineHeight="150%">
                    Не удалось загрузить изображение
                </Text>
            </Stack>
        );
    }

    return (
        <Image
            px={0.5}
            h="75vh"
            loading="lazy"
            key={artifact.id}
            objectFit="contain"
            userSelect="none"
            onError={setIsError.on}
            src={`${import.meta.env.VITE_API_URL}${artifact.content}`}
        />
    );
};