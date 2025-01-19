import { Center, Heading, Stack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { api } from "~/api";
import { Loading } from "~/components/Loading";
import { queryKeys } from "~/utils/query-keys";
import { TourneyActionButtons } from "./TourneyActionButtons";
import { TourneyBracket } from "./TourneyBracket";
import { TourneyHeader } from "./TourneyHeader";
import { TourneySpecificationsSettings } from "./TourneySpecificationsSettings";
import { TourneyTeams } from "./TourneyTeams";
import { TourneyTimersSettings } from "./TourneyTimersSettings";
import { TourneyProvider } from "~/pages/TourneyPage/TourneyProvider";
import { TourneyState } from "~/types/tourney.ts";
import {Prepare} from "src/pages/TourneyPage/Prepare";

type PageParams = {
  tourneyId: string;
};

export const TourneyPage = () => {
  const { tourneyId = "" } = useParams<PageParams>();

  const tourneyQuery = useQuery({
    queryKey: queryKeys.tourney(tourneyId),
    queryFn: () => api.tourneys.getById(tourneyId),
    staleTime: 1000 * 60 * 5,
  });

  if (tourneyQuery.isLoading) {
    return <Loading flex={1} />;
  }

  const tourney = tourneyQuery.data;

  if (!tourney) {
    return (
      <Center flex={1}>
        <Heading>Турнир не найден</Heading>
      </Center>
    );
  }

  return (
    <TourneyProvider tourney={tourney}>
      <Stack
        px={2}
        pb={20}
        mx="auto"
        w="full"
        maxW="wrapper"
        flex={1}
        spacing={{ base: 4, md: 8 }}
      >
        <TourneyHeader tourney={tourney} />
        <TourneyActionButtons tourney={tourney} />
        <TourneyTimersSettings id={tourney.id} settings={tourney.settings} />
        <TourneySpecificationsSettings
          id={tourney.id}
          specifications={tourney.specifications}
        />
        {tourney.state === TourneyState.Prepare && <Prepare/>}
        {tourney.state === TourneyState.GroupStageInProgress &&
            <div>

            </div>}
        {tourney.state === TourneyState.PlayoffInProgress &&
            <TourneyBracket
                id={tourney.id}
                state={tourney.state}
                specifications={tourney.specifications}
            />}
        <TourneyTeams id={tourney.id} />
      </Stack>
    </TourneyProvider>
  );
};
