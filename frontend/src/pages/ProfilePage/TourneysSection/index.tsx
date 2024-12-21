import {
  BoxProps,
  Center,
  HStack,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { api } from "~/api";
import { Loading } from "~/components/Loading.tsx";
import { TourneysTable } from "~/components/TourneysTable";
import { queryKeys } from "~/utils/query-keys.ts";
import { CreateTourneyButton } from "~/pages/ProfilePage/TourneysSection/CreateTourneyButton.tsx";

export const TourneysSection = (props: BoxProps) => {
  const tourneysQuery = useQuery({
    queryKey: queryKeys.tourneys,
    queryFn: api.tourneys.find,
    staleTime: 1000 * 60 * 5,
  });

  const tourneys = (tourneysQuery.data?.items || []).sort(
    (a, b) => a.startDate.getTime() - b.startDate.getTime()
  );

  return (
    <Stack {...props} spacing={8}>
      <HStack px={10} justify="space-between">
        <Heading fontSize="3xl" children="Организованные турниры" />
        <CreateTourneyButton />
      </HStack>
      {tourneysQuery.isLoading ? (
        <Loading py={20} />
      ) : tourneys.length > 0 ? (
        <TourneysTable tourneys={tourneys} />
      ) : (
        <Center py={20}>
          <Heading fontSize="xl">Вы ещё не организовывали турниры</Heading>
        </Center>
      )}
    </Stack>
  );
};
