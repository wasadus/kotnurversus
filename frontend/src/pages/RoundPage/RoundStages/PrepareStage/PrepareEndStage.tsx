import { useHandleError } from "~/hooks/useHandleError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRoundContext } from "~/pages/RoundPage/round-context";
import { api } from "~/api";
import { queryKeys } from "~/utils/query-keys";
import { Stage } from "~/pages/RoundPage/RoundStages/Stage";
import { Stack, Text } from "@chakra-ui/react";
import { ButtonWithAlert } from "~/components/ButtonWithAlert";
import { STAGE_COLOR, STAGE_STATE } from "~/pages/RoundPage/RoundStages/PrepareStage/constants";

type PrepareEndStageProps = {
    timerEnd: Date;
};

export const PrepareEndStage = ({ timerEnd }: PrepareEndStageProps) => {
    const handleError = useHandleError();
    const queryClient = useQueryClient();
    const { isOrganizer, round, getTeams } = useRoundContext();

    const endMutation = useMutation({
        mutationFn: async () => {
            return await api.rounds.end(round.id, STAGE_STATE);
        },
        onSuccess: (round) => {
            queryClient.setQueryData(queryKeys.round(round.id), round);
        },
        onError: handleError,
    });

    return (
        <>
            {getTeams().map((team, i) => (
                <Stage.Team key={team?.id || i} gridArea={`t${i + 1}`} team={team} />
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
                <Text textAlign="center" fontSize={{ base: "xl", md: "2xl" }}>
                    Команды формируют архитектуры
                </Text>
                {isOrganizer && (
                    <ButtonWithAlert
                        colorScheme="teal"
                        isLoading={endMutation.isPending}
                        onSubmit={() => endMutation.mutateAsync()}
                        buttonText="Перейти к следующему этапу"
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