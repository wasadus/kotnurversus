import { ArtifactItemProps } from "~/pages/RoundPage/RoundArtifacts/ArtifactItem";
import { IconButton, useDisclosure } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHandleError } from "~/hooks/useHandleError";
import { api } from "~/api";
import { queryKeys } from "~/utils/query-keys";
import { CrossIcon } from "~/icons/CrossIcon";
import { Alert } from "~/components/Alert";

export const DeleteButton = ({
                          roundId,
                          artifact,
                      }: Pick<ArtifactItemProps, "roundId" | "artifact">) => {
    const alert = useDisclosure();
    const queryClient = useQueryClient();
    const handleError = useHandleError();

    const deleteArtifact = useMutation({
        mutationFn: async () => {
            await api.rounds.deleteArtifact(roundId, artifact.id);
        },
        onSuccess: async () => {
            alert.onClose();
            await queryClient.refetchQueries({
                queryKey: queryKeys.round(roundId),
            });
        },
        onError: handleError,
    });

    return (
        <>
            <IconButton
                pos="absolute"
                top={-2}
                right={-2}
                size="xs"
                variant="solid"
                colorScheme="red"
                opacity={0}
                borderRadius="full"
                aria-label="Удалить изображение"
                icon={<CrossIcon boxSize={5} />}
                _focusVisible={{ opacity: 1, boxShadow: "outline" }}
                isDisabled={deleteArtifact.isPending}
                onClick={alert.onOpen}
            />
            <Alert
                isOpen={alert.isOpen}
                isLoading={deleteArtifact.isPending}
                onClose={alert.onClose}
                onSubmit={deleteArtifact.mutateAsync}
                children="Вы уверены, что хотите безвозвратно удалить данное изображение?"
            />
        </>
    );
};