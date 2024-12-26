import { useDebounce } from "~/hooks/useDebounce";
import { ChangeEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "~/utils/query-keys";
import { api } from "~/api";
import { TourneyState } from "~/types/tourney";
import { Input } from "~/components/Input";
import { SearchIcon } from "~/icons/SearchIcon";
import { Loading } from "~/components/Loading";
import { Center, Heading, Stack } from "@chakra-ui/react";
import { TourneysTable } from "~/pages/TourneysPage/TourneysTable";

export const TourneysSection = () => {
    const debounce = useDebounce(300);
    const [searchValue, setSearchValue] = useState("");

    const tourneysQuery = useQuery({
        queryKey: queryKeys.tourneys,
        queryFn: api.tourneys.find,
        staleTime: 1000 * 60 * 5,
    });

    const tourneys = (tourneysQuery.data?.items || [])
        .filter((t) => t.title.toLowerCase().includes(searchValue))
        .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    const currentTourneys = tourneys.filter(
        (t) => t.state !== TourneyState.Complete
    );
    const pastTourneys = tourneys.filter(
        (t) => t.state === TourneyState.Complete
    );

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value.trim().toLowerCase();
        debounce.set(() => setSearchValue(value));
    };

    return (
        <>
            <Input
                size={{ base: "sm", md: "lg" }}
                onChange={handleSearch}
                placeholder="Поиск по названию турнира"
                rightElement={<SearchIcon boxSize={{ base: 4, md: 6 }} />}
                rightElementProps={{ pointerEvents: "none" }}
                containerProps={{ mx: "auto", w: { base: "90%", md: "70%" } }}
            />
            {tourneysQuery.isLoading ? (
                <Loading py={10} />
            ) : currentTourneys.length > 0 || pastTourneys.length > 0 ? (
                <Stack spacing={{ base: 6, md: 8 }}>
                    <TourneysTable title="Текущие турниры" tourneys={currentTourneys} />
                    <TourneysTable title="Прошедшие турниры" tourneys={pastTourneys} />
                </Stack>
            ) : (
                <Center py={10}>
                    <Heading fontSize={{ base: "lg", md: "2xl" }}>
                        Турниры не найдены
                    </Heading>
                </Center>
            )}
        </>
    );
};