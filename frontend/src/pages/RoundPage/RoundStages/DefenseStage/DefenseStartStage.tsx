import { useHandleError } from "~/hooks/useHandleError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRoundContext } from "~/pages/RoundPage/round-context";
import { api } from "~/api";
import { queryKeys } from "~/utils/query-keys";
import { Stage } from "~/pages/RoundPage/RoundStages/Stage";
import { Button } from "@chakra-ui/react";
import { STAGE_COLOR, STAGE_STATE } from "~/pages/RoundPage/RoundStages/DefenseStage/constants";

export const DefenseStartStage = () => {
    const handleError = useHandleError();
    const queryClient = useQueryClient();
    const { isOrganizer, round, currentTeamId, getTeams } = useRoundContext();

    const startMutation = useMutation({
        mutationFn: async () => {
            return await api.rounds.start(round.id, STAGE_STATE, currentTeamId);
        },
        onSuccess: (round) => {
            queryClient.setQueryData(queryKeys.round(round.id), round);
        },
        onError: handleError,
    });

    return (
        <>
            {getTeams().map((team, i) => (
                <Stage.Team
                    key={team?.id || i}
                    isDisabled
                    isChosen={currentTeamId === team?.id}
                    gridArea={`t${i + 1}`}
                    activeColor={STAGE_COLOR}
                    team={team}
                />
            ))}
            <Stage.MainInfo>
                Подготовка <br /> команды для защиты
            </Stage.MainInfo>
            {isOrganizer && (
                <Button
                    gridArea="b"
                    justifySelf="center"
                    colorScheme="teal"
                    isLoading={startMutation.isPending}
                    onClick={() => startMutation.mutateAsync()}
                    children="Запустить таймер"
                />
            )}
        </>
    );
};