import { useHandleError } from "~/hooks/useHandleError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRoundContext } from "~/pages/RoundPage/round-context";
import { useState } from "react";
import { api } from "~/api";
import { queryKeys } from "~/utils/query-keys";
import { Stage } from "~/pages/RoundPage/RoundStages/Stage";
import { Button, Stack, Text } from "@chakra-ui/react";
import { STAGE_COLOR, STAGE_STATE } from "~/pages/RoundPage/RoundStages/PresentationStage/constants";

export const PresentationStartStage = () => {
    const handleError = useHandleError();
    const queryClient = useQueryClient();
    const { isOrganizer, round, currentTeamId, getTeams, isStateFirstTime } =
        useRoundContext();
    const [chosenTeamId, setChosenTeamId] = useState(currentTeamId);

    const isFirstTime = isStateFirstTime(STAGE_STATE);

    const startMutation = useMutation({
        mutationFn: async () => {
            return await api.rounds.start(round.id, STAGE_STATE, chosenTeamId);
        },
        onSuccess: (round) => {
            queryClient.setQueryData(queryKeys.round(round.id), round);
        },
        onError: handleError,
    });

    return (
        <>
            {getTeams().map((team, i) => {
                if (!team) return null;
                return (
                    <Stage.Team
                        key={team.id}
                        gridArea={`t${i + 1}`}
                        activeColor={STAGE_COLOR}
                        team={team}
                        isDisabled={!isFirstTime || !isOrganizer || startMutation.isPending}
                        isChosen={chosenTeamId === team.id}
                        onChoose={setChosenTeamId}
                    />
                );
            })}
            <Stage.MainInfo
                isMinContent
                children="Подготовка команды к выступлению"
            />
            {isOrganizer && (
                <Stack align="center" gridArea="b">
                    {isFirstTime && (
                        <Text textAlign="center" fontSize="md" lineHeight="150%">
                            Нажмите на команду, <br /> которая будет выступать
                        </Text>
                    )}
                    <Button
                        colorScheme="teal"
                        isLoading={startMutation.isPending}
                        isDisabled={chosenTeamId === undefined}
                        onClick={() => startMutation.mutateAsync()}
                        children="Запустить таймер"
                    />
                </Stack>
            )}
        </>
    );
};