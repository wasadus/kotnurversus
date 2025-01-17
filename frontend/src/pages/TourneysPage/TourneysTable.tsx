import { Heading, Stack } from "@chakra-ui/react";
import { TourneysTable as BaseTourneysTable } from "~/components/TourneysTable";
import { Tourney } from "~/types/tourney";

type Props = {
  title: string;
  tourneys: Tourney[];
};

export const TourneysTable = ({ title, tourneys }: Props) => {
  if (tourneys.length < 1) return null;

  return (
    <Stack spacing={4}>
      <Heading
        fontSize={{ base: "md", md: "xl" }}
        textTransform="uppercase"
        textAlign="center"
      >
        {title}
      </Heading>
      <BaseTourneysTable tourneys={tourneys} />
    </Stack>
  );
};
