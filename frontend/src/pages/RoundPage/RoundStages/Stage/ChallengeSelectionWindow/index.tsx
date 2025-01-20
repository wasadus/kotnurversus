import {
  Center,
  Heading,
  SimpleGrid,
  useBoolean,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { compare } from "fast-json-patch";
import { useMemo, useState } from "react";
import { api } from "~/api";
import { Window, WindowProps } from "~/components/Window";
import { useChallengesQuery } from "~/hooks/useChallengesQuery";
import { useHandleError } from "~/hooks/useHandleError";
import { useRoundContext } from "~/pages/RoundPage/round-context";
import { Challenge } from "~/types/challenge";
import { Round } from "~/types/round";
import { TourneyTeam } from "~/types/tourney";
import { isDefined } from "~/utils";
import { queryKeys } from "~/utils/query-keys";
import { ChallengeWindow } from "../ChallengeWindow";
import { CategoryCard } from "~/pages/RoundPage/RoundStages/Stage/ChallengeSelectionWindow/CategoryCard";
import { IconButtonWithTooltip } from "~/components/IconButtonWithTooltip";
import { EyeClose } from "~/icons/EyeClose";
import { EyeOpen } from "~/icons/EyeOpen";

type Props = {
  team?: TourneyTeam;
};

export const ChallengeSelectionWindow = ({
  team,
  onClose,
  ...props
}: WindowProps<Props>) => {
  const queryClient = useQueryClient();
  const handleError = useHandleError();
  const { round } = useRoundContext();
  const [chosenChallenge, setChosenChallenge] = useState<Challenge>();
  const [showDetails, setShowDetails] = useBoolean(false);
  const label = showDetails ? "Скрыть подробности" : "Показать подробности";
  const Icon = showDetails ? EyeClose : EyeOpen;

  const query = useChallengesQuery({
    roundId: round.id,
    enabled: props.isOpen,
  });

  const addChallengeMutation = useMutation({
    mutationFn: async (chosenChallengeId: string) => {
      const newParticipants = round.participants.map((p) =>
        p.teamId == team?.id
          ? { ...p, challenges: [...p.challenges, chosenChallengeId] }
          : p
      );
      const operations = compare(
        { participants: round.participants },
        { participants: newParticipants }
      );
      return await api.rounds.patch(round.id, operations);
    },
    onSuccess: (round) => {
      onClose();
      queryClient.setQueryData(queryKeys.round(round.id), round);
    },
    onError: handleError,
  });

  const data = useMemo(() => {
    const challengesByCategoryId = query.getChallengesByCategoryId(
      calcAvailableChallenges(round, query.challenges)
    );
    const categories = query.categories.filter(
      (c) => challengesByCategoryId[c.id]?.length > 0
    );
    const disabledCategoryIds = new Set(
      round.participants
        .find((p) => p.teamId === team?.id)
        ?.challenges.map(
          (id) => query.challenges.find((c) => c.id === id)?.categoryId
        )
        .filter(isDefined)
    );
    const disabledChallengeIds = new Set(
      round.participants.flatMap((p) => p.challenges) || []
    );

    return {
      categories,
      challengesByCategoryId,
      disabledCategoryIds,
      disabledChallengeIds,
    };
  }, [props.isOpen, query.isLoading]);

  const handleSubmit = async () => {
    if (!chosenChallenge) return;
    await addChallengeMutation.mutateAsync(chosenChallenge.id);
  };

  const handleClose = () => {
    onClose();
    addChallengeMutation.reset();
    setChosenChallenge(undefined);
  };

  return (
    <>
      <Window
        {...props}
        onClose={handleClose}
        heading={`Команда "${team?.title}" выбирает требование`}
        isWindowLoading={query.isLoading}
        isLoading={addChallengeMutation.isPending}
        contentProps={{ w: "1150px" }}
        submitProps={{
          isDisabled: chosenChallenge === undefined,
          onClick: handleSubmit,
          children: "Подтвердить",
        }}
        extraButton={<IconButtonWithTooltip
            size="sm"
            variant="outline"
            border="none"
            tabIndex={-1}
            label={label}
            icon={<Icon boxSize={6} />}
            onClick={setShowDetails.toggle}
        />}
      >
        {(query.isError || data.categories.length < 1) && (
          <Center py={20}>
            <Heading fontSize="lg">
              {query.isError
                ? "Не удалось загрузить доп. требования"
                : "Все доп. требования уже выбраны"}
            </Heading>
          </Center>
        )}
        {data.categories.length > 0 && (
          <SimpleGrid columns={{ base: 1, xl: 2 }} columnGap={12} rowGap={4}>
            {data.categories
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((category) => (
                <CategoryCard
                  isDisabled={data.disabledCategoryIds.has(category.id)}
                  key={category.id}
                  category={category}
                  challenges={data.challengesByCategoryId[category.id]}
                  chosenChallengeId={chosenChallenge?.id}
                  onChoose={setChosenChallenge}
                  disabledChallengeIds={data.disabledChallengeIds}
                  showDetails={showDetails}
                />
              ))}
          </SimpleGrid>
        )}
      </Window>
      <ChallengeWindow
        isOpen={addChallengeMutation.isSuccess}
        onClose={handleClose}
        challenge={chosenChallenge}
        category={query.categories.find(
          (c) => c.id === chosenChallenge?.categoryId
        )}
      />
    </>
  );
};

const calcAvailableChallenges = (round: Round, challenges: Challenge[]) => {
  return challenges.filter((c) => round.settings.catsInTheBag || !c.isCatInBag);
};
