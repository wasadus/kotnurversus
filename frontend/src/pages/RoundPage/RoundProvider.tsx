import { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "~/utils/query-keys.ts";
import { api } from "~/api";
import { Loading } from "~/components/Loading.tsx";
import { Center, Heading } from "@chakra-ui/react";
import { Context } from "~/pages/RoundPage/Context";

type RoundProviderProps = {
    roundId: string;
    children: ReactNode;
};

export const RoundProvider = ({ roundId, children }: RoundProviderProps) => {
    const roundQuery = useQuery({
        queryKey: queryKeys.round(roundId),
        queryFn: () => api.rounds.getById(roundId),
        enabled: Boolean(roundId),
        refetchInterval: 1000 * 5,
    });

    const tourneyQuery = useQuery({
        queryKey: queryKeys.tourney(roundQuery.data?.gameId),
        queryFn: () => api.tourneys.getById(roundQuery.data?.gameId || ""),
        enabled: Boolean(roundQuery.data?.gameId),
        staleTime: 1000 * 60,
    });

    if (roundQuery.isLoading || tourneyQuery.isLoading) {
        return <Loading flex={1} />;
    }

    if (!roundQuery.data || !tourneyQuery.data) {
        return (
            <Center flex={1}>
                <Heading>Турнир или раунд не найден</Heading>
            </Center>
        );
    }

    const contextValue = { tourney: tourneyQuery.data, round: roundQuery.data };

    return <Context.Provider value={contextValue} children={children} />;
};