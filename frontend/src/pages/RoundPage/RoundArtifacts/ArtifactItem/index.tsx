import {
  Box,
  Image,
  Skeleton,
  Stack,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import { memo } from "react";
import { NotAllowedIcon } from "~/icons/NotAllowedIcon";
import { RoundArtifact } from "~/types/round";
import { DeleteButton } from "~/pages/RoundPage/RoundArtifacts/ArtifactItem/DeleteButton";

export type ArtifactItemProps = {
  roundId: string;
  artifact: RoundArtifact;
  onClick: (artifactId: string) => void;
  isOrganizer?: boolean;
};

export const ArtifactItem = memo(
  ({ roundId, artifact, onClick, isOrganizer }: ArtifactItemProps) => {
    const [isLoading, setIsLoading] = useBoolean(true);
    const [isError, setIsError] = useBoolean(false);

    const handleLoad = () => {
      setIsError.off();
      setIsLoading.off();
    };

    const handleError = () => {
      setIsLoading.off();
      setIsError.on();
    };

    return (
      <Skeleton
        pos="relative"
        borderRadius={4}
        isLoaded={!isLoading}
        _hover={{ button: { opacity: 1 } }}
      >
        <Box
          as="button"
          borderRadius={8}
          onClick={() => onClick(artifact.id)}
          transition="transform 200ms ease-out"
          _hover={{ transform: "scale(0.98)" }}
          _focusVisible={{ outline: "none", boxShadow: "outline" }}
        >
          {isError ? (
            <Stack
              boxSize={{ base: "100px", md: "175px" }}
              align="center"
              justify="center"
              userSelect="none"
              borderRadius={8}
              bg="blackAlpha.50"
              _dark={{ bg: "whiteAlpha.50" }}
              _hover={{ bg: "blackAlpha.100", _dark: { bg: "whiteAlpha.100" } }}
              _focusVisible={{ outline: "none", boxShadow: "outline" }}
            >
              <NotAllowedIcon boxSize={{ base: 6, md: 12 }} />
              <Text fontSize={{ base: "xs", md: "sm" }} lineHeight="150%">
                Не удалось загрузить изображение
              </Text>
            </Stack>
          ) : (
            <Image
              boxSize={{ base: "100px", md: "175px" }}
              loading="lazy"
              objectFit="cover"
              borderRadius={8}
              onLoad={handleLoad}
              onError={handleError}
              src={`${import.meta.env.VITE_API_URL}${artifact.content}`}
            />
          )}
        </Box>
        {isOrganizer && <DeleteButton roundId={roundId} artifact={artifact} />}
      </Skeleton>
    );
  },
  (prev, next) => {
    return (
        prev.isOrganizer === next.isOrganizer &&
        prev.roundId === next.roundId &&
        prev.artifact.id === next.artifact.id
    );
  }
);
