import {Button, Stack, Text, useDisclosure} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import api from "~/api";
import ButtonWithAlert from "~/components/ButtonWithAlert";
import useHandleError from "~/hooks/useHandleError";
import {Round, RoundParticipant, RoundState} from "~/types/round";
import { TourneyTeam } from "~/types/tourney";
import queryKeys from "~/utils/query-keys";
import { useRoundContext } from "../round-context";
import Stage from "./Stage";
import ChallengeSelectionWindow from "./Stage/ChallengeSelectionWindow";
import Alert from "~/components/Alert.tsx";

const STAGE_COLOR = "#D83161";
const STAGE_STATE = RoundState.Prepare;

const PrepareStage = () => {
  const { getTimerEnd } = useRoundContext();
  const timerEnd = getTimerEnd();

  return timerEnd ? (
    <PrepareEndStage timerEnd={timerEnd} />
  ) : (
    <PrepareStartStage />
  );
};

const PrepareStartStage = () => {
  const handleError = useHandleError();
  const queryClient = useQueryClient();
  const { isOrganizer, round, getTeams } = useRoundContext();
  const [currentTeam, setCurrentTeam] = useState<TourneyTeam>();
  const maxChallengesCount = 6;

  const handleChoose = (team?: TourneyTeam, alert?: () => void) => () => {
    const currentRound = queryClient.getQueryData(queryKeys.round(round.id));
    if (team) {
      const chosenParticipant = (currentRound as Round).participants.filter((p: RoundParticipant) => p.teamId === team.id)[0];
      if (chosenParticipant.challenges.length < maxChallengesCount) {
        setCurrentTeam(team);
      } else {
        if (alert) {
          alert();
        }
      }
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
                onClose={alert.onClose}
                onSubmit={alert.onClose}
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

type PrepareEndStageProps = {
  timerEnd: Date;
};

const PrepareEndStage = ({ timerEnd }: PrepareEndStageProps) => {
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

export default PrepareStage;
