import {Grid, GridProps} from "@chakra-ui/react";
import { HeaderCell } from "~/components/TourneysTable/HeaderCell";

export const HeaderRow = (props: GridProps) => (
    <Grid
        {...props}
        gridTemplateColumns={{ base: "1fr 60px 80px", md: "1fr 150px 200px" }}
        fontSize={{ base: "xs", md: "sm" }}
    >
        <HeaderCell>Турнир</HeaderCell>
        <HeaderCell textAlign="center">Дата</HeaderCell>
        <HeaderCell textAlign="center">Тип</HeaderCell>
    </Grid>
);