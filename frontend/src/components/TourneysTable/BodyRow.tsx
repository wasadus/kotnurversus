import { Tourney } from "~/types/tourney";
import { memo } from "react";
import { Grid } from "@chakra-ui/react";
import { Link } from "~/components/Link";
import { paths } from "~/pages/paths";
import { format } from "date-fns";
import { TOURNEY_TYPE_NAMES } from "~/utils/tourney";
import { BodyCell } from "~/components/TourneysTable/BodyCell";

type BodyRowProps = {
    tourney: Tourney;
};

export const BodyRow = memo(
    ({ tourney }: BodyRowProps) => (
        <Grid
            as={Link}
            href={paths.tourney.path(tourney.id)}
            gridTemplateColumns={{ base: "1fr 60px 80px", md: "1fr 150px 200px" }}
            gridAutoRows={{ base: "50px", md: "64px" }}
            fontSize={{ base: "sm", md: "lg" }}
            bg="blackAlpha.50"
            alignItems="center"
            _hover={{ bg: "blackAlpha.100" }}
            _dark={{
                bg: "whiteAlpha.50",
                _hover: { bg: "whiteAlpha.100" },
            }}
        >
            <BodyCell>{tourney.title}</BodyCell>
            <BodyCell textAlign="center">
                {format(tourney.startDate, "dd.MM")}
            </BodyCell>
            <BodyCell textAlign="center">{TOURNEY_TYPE_NAMES[tourney.form]}</BodyCell>
        </Grid>
    ),
    (prev, next) => prev.tourney.id === next.tourney.id
);