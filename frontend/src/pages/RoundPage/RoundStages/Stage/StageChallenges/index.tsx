import { Wrap, WrapProps } from "@chakra-ui/react";
import { useChallengesQuery } from "~/hooks/useChallengesQuery.ts";
import { useRoundContext } from "~/pages/RoundPage/round-context.tsx";
import { ChallengeCard } from "~/pages/RoundPage/RoundStages/Stage/StageChallenges/ChallengeCard";

type Props = {
  teamId: string;
} & WrapProps;

export const StageChallenges = ({ teamId, ...props }: Props) => {
  const { round } = useRoundContext();

  const chosenChallengeIds =
    round.participants.find((p) => p.teamId === teamId)?.challenges || [];

  const query = useChallengesQuery({
    roundId: round.id,
    enabled: chosenChallengeIds.length > 0,
  });

  if (chosenChallengeIds.length < 1) return null;

  const isFirstTeam = round.participants.at(0)?.teamId === teamId;

  return (
    <Wrap
      w="full"
      spacing={6}
      align="flex-start"
      justifySelf={isFirstTeam ? "flex-end" : "flex-start"}
      justify={{ base: "center", md: isFirstTeam ? "flex-end" : "flex-start" }}
      {...props}
    >
      {chosenChallengeIds.map((id) => {
        const challenge = query.challenges.find((c) => c.id === id);
        const category = query.categories.find(
          (c) => c.id === challenge?.categoryId
        );
        if (!challenge || !category) return null;
        return (
          <ChallengeCard key={id} category={category} challenge={challenge} />
        );
      })}
    </Wrap>
  );
};
