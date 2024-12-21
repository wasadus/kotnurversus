import { useHandleError } from "~/hooks/useHandleError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRoundContext } from "~/pages/RoundPage/round-context";
import { api } from "~/api";
import { queryKeys } from "~/utils/query-keys";
import { Stage } from "~/pages/RoundPage/RoundStages/Stage";
import { Stack, Text } from "@chakra-ui/react";
import { ButtonWithAlert } from "~/components/ButtonWithAlert";
import { STAGE_COLOR, STAGE_STATE } from "~/pages/RoundPage/RoundStages/DefenseStage/constants";

type DefenseEndStageProps = {
    timerEnd: Date;
};

export const DefenseEndStage = ({ timerEnd }: DefenseEndStageProps) => {
    const handleError = useHandleError();
    const queryClient = useQueryClient();
    const { isOrganizer, tourney, round, getTeams, isStateFirstTime } =
        useRoundContext();

    const isFirstTime = isStateFirstTime(STAGE_STATE);

    const endMutation = useMutation({
        mutationFn: async () => {
            return await api.rounds.end(round.id, STAGE_STATE, currentTeam?.id);
        },
        onSuccess: (round) => {
            queryClient.setQueryData(queryKeys.round(round.id), round);
        },
        onError: handleError,
    });

    const currentTeam = tourney.teams.find(
        (t) => t.id === round.currentState?.value?.teamId
    );

    return (
        <>
            {getTeams().map((team, i) => (
                <Stage.Team
                    isDisabled
                    isChosen={currentTeam?.id == team?.id}
                    activeColor={STAGE_COLOR}
                    key={team?.id || i}
                    gridArea={`t${i + 1}`}
                    team={team}
                />
            ))}
            <Stage.Timer
                gridArea="m"
                alignSelf="center"
                justifySelf="center"
                endDate={timerEnd}
                activeColor={STAGE_COLOR}
            />
            {round.participants.slice(0, 2).map((p, i) => (
                <Stage.Timeout
                    key={p.teamId}
                    gridArea={`e${i + 1}`}
                    teamId={p.teamId}
                />
            ))}
            <Stack align="center" gridArea="b" spacing={4}>
                <Text
                    textAlign="center"
                    fontSize={{ base: "xl", md: "2xl" }}
                    lineHeight="150%"
                >
                    Защита команды "{currentTeam?.title || "???"}"
                </Text>
                {isOrganizer && (
                    <ButtonWithAlert
                        colorScheme="teal"
                        isLoading={endMutation.isPending}
                        onSubmit={() => endMutation.mutateAsync()}
                        buttonText={
                            isFirstTime
                                ? "Перейти к презентации другой команды"
                                : "Перейти к следующему этапу"
                        }
                        alertText={[
                            "Вы уверены, что хотите перейти к следующему этапу?",
                            "Вернуться будет невозможно",
                        ].join("\n")}
                    />
                )}
            </Stack>
        </>
    );
};