import {
  Stack,
  Text,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { api } from "~/api";
import { ButtonWithAlert } from "~/components/ButtonWithAlert";
import { useCustomToast } from "~/hooks/useCustomToast";
import { useHandleError } from "~/hooks/useHandleError";
import { getErrorApiStatus } from "~/utils/error";
import { queryKeys } from "~/utils/query-keys";
import { useRoundContext } from "../../round-context";
import { Stage } from "../Stage";
import { MarkInput } from "~/pages/RoundPage/RoundStages/MarkStage/MarkInput";

export const MarkStage = () => {
  const toast = useCustomToast();
  const handleError = useHandleError();
  const queryClient = useQueryClient();
  const { isOrganizer, round, getTeams } = useRoundContext();
  const marks = useRef<Record<string, number>>({});

  const finishRoundMutation = useMutation({
    mutationFn: async () => {
      return await api.rounds.finish(round.id, {
        marks: Object.entries(marks.current).map(([teamId, mark]) => ({
          teamId,
          mark,
        })),
      });
    },
    onSuccess: (round) => {
      queryClient.setQueryData(queryKeys.round(round.id), round);
    },
    onError: (error) => {
      if (getErrorApiStatus(error) === "sameMarks") {
        toast.warning({
          description: "Никакой ничьи. Всегда должен быть победитель!",
        });
      } else {
        handleError(error);
      }
    },
  });

  const handleMark = (teamId: string) => (mark: number) => {
    marks.current = { ...marks.current, [teamId]: mark };
  };

  return (
    <>
      {getTeams().map((team, i) => (
        <Stage.Team key={team?.id || i} gridArea={`t${i + 1}`} team={team} />
      ))}
      {isOrganizer &&
        round.participants
          .slice(0, 2)
          .map((p, i) => (
            <MarkInput
              key={p.teamId}
              gridArea={`e${i + 1}`}
              justifySelf={i === 0 ? "flex-end" : "flex-start"}
              onChange={handleMark(p.teamId)}
            />
          ))}
      <Stage.MainInfo children="Оценка команд" />
      {isOrganizer && (
        <Stack align="center" gridArea="b">
          <Text textAlign="center" fontSize="md" lineHeight="150%">
            Выставите командам баллы
            <br />
            Когда будете готовы - завершите раунд
          </Text>
          <ButtonWithAlert
            closeBeforeSubmit
            colorScheme="teal"
            isLoading={finishRoundMutation.isPending}
            onSubmit={() => finishRoundMutation.mutateAsync()}
            buttonText="Завершить игру"
            alertText={[
              "Вы уверены, что хотите закончить раунд?",
              "Изменить результаты будет невозможно",
            ].join("\n")}
          />
        </Stack>
      )}
    </>
  );
};
