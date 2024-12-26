import { useHandleError } from "~/hooks/useHandleError.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDisclosure } from "@chakra-ui/react";
import { Challenge, CreateChallenge } from "~/types/challenge.ts";
import { api } from "~/api";
import { queryKeys } from "~/utils/query-keys.ts";
import { ChallengeCard as BaseChallengeCard } from "~/components/ChallengeCard.tsx";
import { ChallengeWindow } from "~/components/ChallengeWindow";
import { Category } from "~/types/category.ts";

type ChallengeCardProps = {
    category: Category;
    challenge: Challenge;
};

export const ChallengeCard = ({ category, challenge }: ChallengeCardProps) => {
    const handleError = useHandleError();
    const queryClient = useQueryClient();
    const window = useDisclosure();

    const editChallenge = useMutation({
        mutationFn: async (data: CreateChallenge) => {
            return await api.challenges.update(challenge, data);
        },
        onSuccess: async () => {
            window.onClose();
            await queryClient.refetchQueries({ queryKey: queryKeys.challenges() });
        },
        onError: handleError,
    });

    const deleteChallenge = useMutation({
        mutationFn: async () => {
            await api.challenges.delete(challenge.id);
        },
        onSuccess: async () => {
            window.onClose();
            await queryClient.refetchQueries({ queryKey: queryKeys.challenges() });
        },
        onError: handleError,
    });

    return (
        <>
            <BaseChallengeCard
                {...window.getButtonProps()}
                w="160px"
                category={category}
                challenge={challenge}
                onClick={window.onOpen}
            />
            <ChallengeWindow.Edit
                {...window.getDisclosureProps()}
                isOpen={window.isOpen}
                onClose={window.onClose}
                isLoading={editChallenge.isPending || deleteChallenge.isPending}
                onSubmit={editChallenge.mutateAsync}
                onRemove={deleteChallenge.mutateAsync}
                challenge={challenge}
            />
        </>
    );
};