import { useHandleError } from "~/hooks/useHandleError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRoundContext } from "~/pages/RoundPage/round-context";
import { useDisclosure } from "@chakra-ui/react";
import { api } from "~/api";
import { queryKeys } from "~/utils/query-keys";
import { IconButtonWithTooltip } from "~/components/IconButtonWithTooltip";
import { ResetIcon } from "~/icons/ResetIcon";
import { Alert } from "~/components/Alert";

export const ResetTimerButton = () => {
    const handleError = useHandleError();
    const queryClient = useQueryClient();
    const { round } = useRoundContext();
    const alert = useDisclosure();

    const resetTimerMutation = useMutation({
        mutationFn: async () => {
            return await api.rounds.resetTimer(round.id);
        },
        onSuccess: (round) => {
            queryClient.setQueryData(queryKeys.round(round.id), round);
        },
        onError: handleError,
    });

    const handleSubmit = async () => {
        await resetTimerMutation.mutateAsync();
        alert.onClose();
    };

    return (
        <>
            <IconButtonWithTooltip
                size="md"
                variant="link"
                label="Сбросить таймер"
                icon={<ResetIcon boxSize={8} />}
                isDisabled={resetTimerMutation.isPending}
                onClick={alert.onOpen}
            />
            <Alert
                isOpen={alert.isOpen}
                isLoading={resetTimerMutation.isPending}
                onClose={alert.onClose}
                onSubmit={handleSubmit}
                children="Вы уверены, что хотите перезапустить таймер для текущего этапа?"
            />
        </>
    );
};