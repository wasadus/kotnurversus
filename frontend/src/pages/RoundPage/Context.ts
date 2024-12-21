import { createContext } from "react";
import { Tourney } from "~/types/tourney";
import { Round } from "~/types/round";

type RoundContext = {
    tourney: Tourney;
    round: Round;
};

export const Context = createContext<RoundContext>({
    tourney: {} as Tourney,
    round: {} as Round,
});
