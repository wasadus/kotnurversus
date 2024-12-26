import { Tourney, TourneyState, TourneyTeam } from "~/types/tourney";
import { ReactNode, useMemo } from "react";
import { useDebounce } from "~/hooks/useDebounce";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "~/utils/auth-context";
import { useSubscriptions } from "~/hooks/useSubscriptions";
import { useBreakpointValue } from "@chakra-ui/react";
import { useValue } from "~/hooks/useValue";
import { compare } from "fast-json-patch";
import { api } from "~/api";
import { queryKeys } from "~/utils/query-keys";
import { Context, SubscribeKey } from "~/pages/TourneyPage/tourney-context";

type TourneyProviderProps = {
    tourney: Tourney;
    children: ReactNode;
};

export const TourneyProvider = ({
                                    tourney,
                                    children,
                                }: TourneyProviderProps) => {
    const debounce = useDebounce(500);
    const queryClient = useQueryClient();
    const { isAuthenticated } = useAuthContext();
    const { ping, useSubscribe } = useSubscriptions<SubscribeKey>();
    const isDesktop = useBreakpointValue(
        { base: false, sm: true },
        { ssr: false }
    );

    const teams = useValue(tourney.teams, {
        onUpdate: (newTeams: TourneyTeam[]) => {
            ping("teams");
            debounce.set(async () => {
                const operations = compare({}, { teams: newTeams });
                const updatedTourney = await api.tourneys.patch(tourney.id, operations);
                queryClient.setQueryData(queryKeys.tourney(tourney.id), updatedTourney);
            });
        },
    });

    const isPrepare = tourney.state === TourneyState.Prepare;

    const contextValue = useMemo(
        () => ({
            isDesktop: Boolean(isDesktop),
            isEditable: Boolean(isDesktop) && isAuthenticated && isPrepare,
            useSubscribe,
            teams,
        }),
        [isDesktop, tourney.id, isAuthenticated, isPrepare]
    );

    return <Context.Provider value={contextValue} children={children} />;
};