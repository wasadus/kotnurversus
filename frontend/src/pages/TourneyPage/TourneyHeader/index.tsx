import {
  BoxProps,
  Grid,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { AutoLinkWrapper } from "~/components/AutoLinkWrapper";
import { StateCard } from "~/components/StateCard";
import { Tourney } from "~/types/tourney";
import { TOURNEY_STATE_NAMES, TOURNEY_TYPE_NAMES } from "~/utils/tourney";
import { TourneyInfoRow } from "~/pages/TourneyPage/TourneyHeader/TourneyInfoRow";

type Props = {
  tourney: Tourney;
} & BoxProps;

export const TourneyHeader = ({ tourney, ...props }: Props) => (
  <Grid
    gridTemplateColumns={{ base: "1fr", md: "1.5fr 1fr" }}
    gridGap={{ base: 6, md: 8 }}
    {...props}
  >
    <Stack
      spacing={{ base: 2, md: 4 }}
      align={{ base: "center", md: "flex-start" }}
    >
      <Heading
        fontSize={{ base: "lg", md: "4xl" }}
        textAlign={{ base: "center", md: "left" }}
        children={`Турнир "${tourney.title}"`}
      />
      <StateCard name={TOURNEY_STATE_NAMES[tourney.state]} />
    </Stack>
    <Stack spacing={2} justify="center">
      <TourneyInfoRow name="Формат">
        {TOURNEY_TYPE_NAMES[tourney.form]?.toLowerCase() || "неизвестно"}
      </TourneyInfoRow>
      <TourneyInfoRow name="Дата">
        {format(tourney.startDate, "d MMMM yyyy HH:mm")}
      </TourneyInfoRow>
      {tourney.description && (
        <AutoLinkWrapper>
          <TourneyInfoRow name="Описание" children={tourney.description} />
        </AutoLinkWrapper>
      )}
    </Stack>
  </Grid>
);
