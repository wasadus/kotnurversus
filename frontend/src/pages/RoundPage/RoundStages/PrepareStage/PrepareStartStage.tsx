import { useHandleError } from "~/hooks/useHandleError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRoundContext } from "~/pages/RoundPage/round-context";
import { useState } from "react";
import { TourneyTeam } from "~/types/tourney";
import { api } from "~/api";
import { queryKeys } from "~/utils/query-keys";
import { Stage } from "~/pages/RoundPage/RoundStages/Stage";
import { Button, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { ChallengeSelectionWindow } from "~/pages/RoundPage/RoundStages/Stage/ChallengeSelectionWindow";
import { STAGE_COLOR, STAGE_STATE } from "~/pages/RoundPage/RoundStages/PrepareStage/constants";
import { Alert } from "~/components/Alert.tsx";
import { Round, RoundParticipant } from "~/types/round";

export const PrepareStartStage = () => {
    const handleError = useHandleError();
    const queryClient = useQueryClient();
    const { isOrganizer, round, getTeams } = useRoundContext();
    const [currentTeam, setCurrentTeam] = useState<TourneyTeam>();
    const [alertDismissed, setAlertDismissed] = useState<Record<string, boolean>>({});
    const maxChallengesCount = 6;

    const handleChoose = (team?: TourneyTeam, alert?: () => void) => () => {
        const currentRound = queryClient.getQueryData(queryKeys.round(round.id));
        if (team) {
            const chosenParticipant = (currentRound as Round).participants.filter((p: RoundParticipant) => p.teamId === team.id)[0];
            if (chosenParticipant.challenges.length < maxChallengesCount || alertDismissed[chosenParticipant.teamId]) {
                setCurrentTeam(team);
            } else {
                if (alert) {
                    alert();
                }
            }
        }
    };

    const handleAlertClose = (alertOnClose: () => void, teamId?: string) => {
      if (teamId) {
        alertOnClose();
        setAlertDismissed((prev) => ({ ...prev, [teamId]: true }));
      }
    };

    const startMutation = useMutation({
        mutationFn: async () => {
            return await api.rounds.start(round.id, STAGE_STATE);
        },
        onSuccess: (round) => {
            queryClient.setQueryData(queryKeys.round(round.id), round);
        },
        onError: handleError,
    });

    return (
        <>
            {getTeams().map((team, i) => {
                    const alert = useDisclosure();
                    return (
                        <>
                            <Stage.Team
                                key={team?.id || i}
                                gridArea={`t${i + 1}`}
                                activeColor={STAGE_COLOR}
                                team={team}
                                isDisabled={!isOrganizer || startMutation.isPending}
                                onClick={handleChoose(team, alert.onOpen)}
                            />
                            <Alert
                                isOpen={alert.isOpen}
                                onClose={() => handleAlertClose(alert.onClose, team?.id)}
                                onSubmit={() => handleAlertClose(alert.onClose, team?.id)}
                                heading="Внимание"
                                okText="Ок"
                                cancelText=""
                                children={`Для команды ${team?.title} уже выбрано максимальное количество требований`}
                            />
                        </>
                    );
                }
            )}
            <Stage.MainInfo isMinContent children="Выбор дополнительных требований" />
            {isOrganizer && (
                <Stack align="center" gridArea="b">
                    <Text textAlign="center" fontSize="md" lineHeight="150%">
                        Нажмите на команду, которая будет выбирать
                        <br />
                        Когда будете готовы - нажмите кнопку ниже
                    </Text>
                    <Button
                        colorScheme="teal"
                        isLoading={startMutation.isPending}
                        onClick={() => startMutation.mutateAsync()}
                        children="Запустить таймер"
                    />
                </Stack>
            )}
            {isOrganizer && (
                <ChallengeSelectionWindow
                    isOpen={currentTeam !== undefined}
                    onClose={() => setCurrentTeam(undefined)}
                    team={currentTeam}
                />
            )}
        </>
    );
};