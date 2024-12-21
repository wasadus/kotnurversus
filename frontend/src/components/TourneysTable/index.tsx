import {
  BoxProps,
  Stack
} from "@chakra-ui/react";
import { Tourney } from "~/types/tourney";
import { BodyRow } from "~/components/TourneysTable/BodyRow";
import { HeaderRow } from "~/components/TourneysTable/HeaderRow";

type Props = {
  tourneys: Tourney[];
} & BoxProps;

export const TourneysTable = ({ tourneys, ...props }: Props) => (
  <Stack {...props} spacing={0.5}>
    <HeaderRow mb={2} />
    {tourneys.map((t) => (
      <BodyRow key={t.id} tourney={t} />
    ))}
  </Stack>
);
